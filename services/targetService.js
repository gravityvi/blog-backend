const _ = require("lodash");
const { Target, validate } = require("../models/target");
const Errors = require("../errors/ErrorWithStatusCode");

const TargetService = () => {
  const getOneTargetSortedOnDate = async () => {
    const target = await Target.findOne().sort({ created_on: -1 });
    return target;
  };

  const saveTarget = async (targetDTO) => {
    const { error } = validate(targetDTO);
    if (error) {
      throw Errors(400, error.details[0].message);
    }
    let target = new Target({
      title: targetDTO.title,
      content: targetDTO.content,
      videoLink: targetDTO.videoLink,
    });
    target = await target.save();
    return target;
  };

  const replaceTarget = async (id, targetDTO) => {
    const { error } = validate(targetDTO);
    if (error) {
      throw new Errors(400, error.details[0].message);
    }
    const target = await Target.findById(id);
    if (!target) {
      throw new Errors(404, "Target Not found");
    }
    target.title = targetDTO.title;
    target.content = targetDTO.content;
    target.videoLink = targetDTO.videoLink;
    return target;
  };

  const deleteTargetById = async (id) => {
    const target = await Target.findByIdAndRemove(id);
    if (!target) {
      throw new Errors(404, "Target Not found");
    }
    return target;
  };

  const getTargetById = async (id) => {
    const target = await Target.findById(id);
    if (!target) {
      throw new Errors(404, "Target not found");
    }
    return target;
  };

  return {
    getOneTargetSortedOnDate,
    saveTarget,
    replaceTarget,
    deleteTargetById,
    getTargetById,
  };
};

module.exports = TargetService;
