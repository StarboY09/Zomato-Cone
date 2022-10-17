"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multer = _interopRequireDefault(require("multer"));

var _all_model = require("../../database/all_model");

var _s = require("../../util/s3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = _express.default.Router();

const Storage = _multer.default.memoryStorage();

const upload = (0, _multer.default)({
  Storage
});
/**
 * Route = /:_id
 * does =  Get image details
 * params =_id
 * Access = public
 * Method = GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const image = await _all_model.ImageModel.findById(req.params._id);
    return res.status(200).json({
      image
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
/**
 * Route = /
 * does =  Upload image to s3 save file link to mongodb
 * params =_id
 * Access = public
 * Method = POST
 */

Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucketoptions = {
      // Bucket:"" name of the bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" //Access Control List

    };
    const UploadImage = await (0, _s.s3upload)(bucketoptions);
    const dbupload = await _all_model.ImageModel.create({
      images: [{
        location: UploadImage.ocation
      }]
    });
    return res.status(200).json({
      UploadImage
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
var _default = Router;
exports.default = _default;