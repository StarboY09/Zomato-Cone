"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.s3upload = void 0;

var _awsSdk = _interopRequireWildcard(require("aws-sdk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _joi = require("joi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv.default.config();

const s3Bucket = new _awsSdk.default.S3({
  accessKeyId: process.env.AWS_S3_ACEESS_KEY,
  SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "ap-south-1"
});

const s3upload = options => {
  return new Promise((resolve, reject) => s3Bucket.upload(options, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  }));
};

exports.s3upload = s3upload;