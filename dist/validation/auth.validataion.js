"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateSignup = exports.ValidateSignin = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ValidateSignup = data => {
  const Schema = _joi.default.object({
    fullName: _joi.default.string().required().min(3),
    email: _joi.default.string().email().required(),
    password: _joi.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    address: _joi.default.array().items(_joi.default.object({
      details: _joi.default.string(),
      for: _joi.default.string()
    })),
    phoneNumber: _joi.default.array().items(_joi.default.number().min(10).max(10))
  });

  return Schema.validateAsync(data);
};

exports.ValidateSignup = ValidateSignup;

const ValidateSignin = data => {
  const Schema = _joi.default.object({
    email: _joi.default.string().email().required(),
    password: _joi.default.string().required()
  });

  return Schema.validateAsync(data);
};

exports.ValidateSignin = ValidateSignin;