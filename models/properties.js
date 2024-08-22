const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const propertySchema = new mongoose.Schema({
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
  total_beds: {
    type: Number,
    trim: true,
  },
  min_price: {
    type: Number,
    trim: true,
  },
  max_price: {
    type: Number,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  images: [],
});

propertySchema.plugin(timestamps);
propertySchema.methods.toJSON = function () {
  const property = this;
  const propertyObject = property.toObject();
  const propertyJson = _.pick(propertyObject, [
    "_id",
    "title",
    "short_description",
    "detail_description",
    "total_beds",
    "min_price",
    "max_price",
    "status",
    "images",
    "createdAt",
    "updatedAt",
  ]);
  return propertyJson;
};

function validateProperty(data) {
  let schema = Joi.object({
    title: Joi.string().required().trim(),
    short_description: Joi.string().trim().allow(""),
    detail_description: Joi.string().trim().allow(""),
    status: Joi.boolean().required(),
    total_beds: Joi.number().integer().positive().allow(0),
    min_price: Joi.number().integer().positive().allow(0),
    max_price: Joi.number().integer().positive().allow(0),
    images: Joi.array().required(),
  });
  return schema.validate(data);
}

const property = mongoose.model("Property", propertySchema);
exports.Property = property;
exports.validateProperty = validateProperty;
