"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateID = exports.ValidateCategory = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ValidateID = id => {
  const Schema = _joi.default.object({
    _id: _joi.default.string().required()
  });

  return Schema.validateAsync(id);
};

exports.ValidateID = ValidateID;

const ValidateCategory = category => {
  const Schema = _joi.default.object({
    category: _joi.default.string().required()
  });

  return Schema.validateAsync(category);
};

exports.ValidateCategory = ValidateCategory;