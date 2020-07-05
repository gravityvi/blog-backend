const config = require("config");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const QuestionService = require("../services/questionService");
const Errors = require("../errors/ErrorWithStatusCode");

const questionService = QuestionService();
const UserService = () => {
  const verifyUser = async (requestDTO) => {
    const { error } = validate(requestDTO);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const data = requestDTO.data;

    for (key in data) {
      const questionObj = await questionService.getQuestionWithAnswersById(
        data[key]._id
      );
      const expectedAnswerArray = questionObj.answer;
      console.log("ravi", expectedAnswerArray);
      const actualAnswer = data[key].answer.toLowerCase();
      if (!expectedAnswerArray.includes(actualAnswer)) {
        throw new Errors(400, "Invalid Answers");
      }
    }

    const token = jwt.sign(
      { pass: true, isAdmin: false },
      config.get("jwtPrivateKey")
    );

    return token;
  };
  const validate = (auth) => {
    const schema = {
      data: Joi.array().min(1).items({
        _id: Joi.objectId().required(),
        answer: Joi.string().required(),
      }),
    };
    return Joi.validate(auth, schema);
  };

  return {
    verifyUser,
  };
};

module.exports = UserService;
