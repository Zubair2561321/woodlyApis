const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
    lowercase: true,
  },
  profile_image: {},
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  verification_code: {
    type: String,
    trim: true,
    default: "",
  },
  is_send_code: {
    type: Boolean,
    default: false,
  },
  is_verified_code: {
    type: Boolean,
    default: false,
  },
});

adminUserSchema.plugin(timestamps);

adminUserSchema.methods.toJSON = function () {
  const adminUser = this;
  const adminUserObject = adminUser.toObject();
  const adminUserJson = _.pick(adminUserObject, [
    "_id",
    "name",
    "email",
    "status",
    "profile_image",
    "verification_code",
    "is_send_code",
    "is_verified_code",
    "createdAt",
    "updatedAt",
  ]);
  return adminUserJson;
};

adminUserSchema.statics.findByEmail = function (email) {
  const admin_user = this;
  return admin_user.findOne({ email: email });
};

function validateAdminUser(data, method) {
  let schema = Joi.object({
    name: Joi.string().min(5).max(50).required().trim(),
    email: Joi.string().required().email().trim(),
    status: Joi.boolean(),
    profile_image: Joi.object(),
    verification_code: Joi.string().trim(),
    is_send_code: Joi.boolean(),
    is_verified_code: Joi.boolean(),
  });

  const schemaWithPassword = schema.keys({
    password: Joi.string().min(5).max(25).required().trim(),
  });

  if (method == "POST") {
    schema = schemaWithPassword;
  }

  return schema.validate(data);
}

function validateUpdatedProfile(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required().trim(),
    profile_image: Joi.object(),
  });
  return schema.validate(data);
}

function validateAdminUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
}

function validateChangePassword(data) {
  const schema = Joi.object({
    new_password: Joi.string().min(5).max(255).required(),
    confirm_password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
}

const adminUser = mongoose.model("adminUser", adminUserSchema);
exports.AdminUser = adminUser;
exports.validateAdminUser = validateAdminUser;
exports.validateUpdatedProfile = validateUpdatedProfile;
exports.validateAdminUserLogin = validateAdminUserLogin;
exports.validateChangePassword = validateChangePassword;
