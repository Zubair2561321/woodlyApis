const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  short_description: {
    type: String,
    trim: true,
  },
  detail_description: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {},
});

serviceSchema.plugin(timestamps);
serviceSchema.methods.toJSON = function () {
  const service = this;
  const serviceObject = service.toObject();
  const serviceJson = _.pick(serviceObject, [
    "_id",
    "title",
    "short_description",
    "detail_description",
    "status",
    "image",
    "createdAt",
    "updatedAt",
  ]);
  return serviceJson;
};

function validateService(data) {
  let schema = Joi.object({
    title: Joi.string().required().trim(),
    short_description: Joi.string().trim().allow(""),
    detail_description: Joi.string().trim().allow(""),
    status: Joi.boolean().required(),
  });
  return schema.validate(data);
}

const service = mongoose.model("service", serviceSchema);
exports.Service = service;
exports.validateService = validateService;
