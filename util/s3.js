import aws, { SecretsManager } from "aws-sdk";

import dotenv from "dotenv";
import { options } from "joi";

dotenv.config();

const s3Bucket = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACEESS_KEY,
  SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

export const s3upload = (options) => {
  return new Promise((resolve, reject) =>
    s3Bucket.upload(options, (err, data) => {
      if (err) return reject(err);

      return resolve(data);
    })
  );
};
