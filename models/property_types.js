const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const propertyTypeSchema = new mongoose.Schema({
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

propertyTypeSchema.plugin(timestamps);
propertyTypeSchema.methods.toJSON = function () {
  const propertyType = this;
  const propertyTypeObject = propertyType.toObject();
  const propertyTypeJson = _.pick(propertyTypeObject, [
    "_id",
    "title",
    "short_description",
    "detail_description",
    "status",
    "image",
    "createdAt",
    "updatedAt",
  ]);
  return propertyTypeJson;
};

function validatePropertyType(data) {
  let schema = Joi.object({
    title: Joi.string().required().trim(),
    short_description: Joi.string().trim().allow(""),
    detail_description: Joi.string().trim().allow(""),
    status: Joi.boolean().required(),
  });
  return schema.validate(data);
}

const propertyType = mongoose.model("PropertyType", propertyTypeSchema);
exports.PropertyType = propertyType;
exports.validatePropertyType = validatePropertyType;
