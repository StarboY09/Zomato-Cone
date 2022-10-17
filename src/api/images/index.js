import express from "express";

import aws from "aws-sdk";

import multer from "multer";
import { ImageModel } from "../../database/all_model";

import { s3upload } from "../../util/s3";

const Router = express.Router();

const Storage = multer.memoryStorage();

const upload = multer({ Storage });

/**
 * Route = /:_id
 * does =  Get image details
 * params =_id
 * Access = public
 * Method = GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params._id);
    return res.status(200).json({ image });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
      ACL: "public-read", //Access Control List
    };

    const UploadImage = await s3upload(bucketoptions);

    const dbupload = await ImageModel.create({
      images: [{ location: UploadImage.ocation }],
    });

    return res.status(200).json({ UploadImage });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default Router;
