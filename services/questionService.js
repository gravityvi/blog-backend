const _ = require("lodash");
const { Schema: Question, validate } = require("../models/questions");
const Errors = require("../errors/ErrorWithStatusCode");

function QuestionService() {
  const getQuestions = async () => {
    const question = await Question.find().select("_id question");
    return question;
  };

  const saveQuestion = async (questionDTO) => {
    const { error } = validate(questionDTO);
    if (error) {
      throw new Errors(400, error.details[0].message);
    }
    let question = new Question({
      question: questionDTO.question,
      answer: questionDTO.answer,
    });
    await question.save();
    return question;
  };

  const replaceQuestion = async (id, questionDTO) => {
    const { error } = validate(questionDTO);
    if (error) {
      throw new Errors(400, error.details[0].message);
    }
    const question = await Question.findById(id);
    if (!question) throw new Errors(404, "Question not found");
    question.question = questionDTO.question;
    question.answer = questionDTO.answer;
    question.save();
    return question;
  };

  const getQuestionById = async (id) => {
    const question = await Question.findById(id).select("_id question");
    if (!question) throw new Errors(404, "Question not found");
    return question;
  };

  const getQuestionWithAnswersById = async (id) => {
    const question = await Question.findById(id);
    if (!question) throw new Errors(404, "Question not found");
    return question;
  };

  const deleteQuestionById = async (id) => {
    const question = await Question.findByIdAndRemove(id);
    if (!question) throw new Errors(404, "Question not found");
    return question;
  };

  return {
    getQuestions,
    saveQuestion,
    replaceQuestion,
    getQuestionById,
    deleteQuestionById,
    getQuestionWithAnswersById,
  };
}

module.exports = QuestionService;
