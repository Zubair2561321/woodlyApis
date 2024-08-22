const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const companySchema = new mongoose.Schema({
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

companySchema.plugin(timestamps);
companySchema.methods.toJSON = function () {
  const company = this;
  const companyObject = company.toObject();
  const companyJson = _.pick(companyObject, [
    "_id",
    "title",
    "short_description",
    "detail_description",
    "status",
    "image",
    "createdAt",
    "updatedAt",
  ]);
  return companyJson;
};

function validateCompany(data) {
  let schema = Joi.object({
    title: Joi.string().required().trim(),
    short_description: Joi.string().trim().allow(""),
    detail_description: Joi.string().trim().allow(""),
    status: Joi.boolean().required(),
  });
  return schema.validate(data);
}

const company = mongoose.model("company", companySchema);
exports.Company = company;
exports.validateCompany = validateCompany;
