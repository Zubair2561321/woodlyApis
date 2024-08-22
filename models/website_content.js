const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const websiteContentSchema = new mongoose.Schema({
  website_content: {
    type: Object,
    required: true,
    trim: true,
  },
});

websiteContentSchema.plugin(timestamps);
websiteContentSchema.methods.toJSON = function () {
  const websiteContent = this;
  const websiteContentObject = websiteContent.toObject();
  const websiteContentJson = _.pick(websiteContentObject, [
    "_id",
    "website_content",
    "createdAt",
    "updatedAt",
  ]);
  return websiteContentJson;
};

function validateWebsiteContent(data) {
  let schema = Joi.object({
    website_content: Joi.object().required().allow(null),
  });
  return schema.validate(data);
}

const websiteContent = mongoose.model("websiteContent", websiteContentSchema);
exports.WebsiteContent = websiteContent;
exports.validateWebsiteContent = validateWebsiteContent;
