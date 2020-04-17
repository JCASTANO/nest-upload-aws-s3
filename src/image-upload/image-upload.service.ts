import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { v4 as uuid } from 'uuid';
import path = require('path');

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3Connection = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
@Injectable()
export class ImageUploadService {

  async fileupload(@Req() req, @Res() res) {

      this.upload(req, res, (error) => {
        if (error) {
          return res.status(500).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
  }

  upload = multer({
    storage: multerS3({
      s3: s3Connection,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: (request, file, cb) => {
        cb(null, `${uuid()}${path.extname(file.originalname)}`);
      },
    }),
  }).array('upload', 1);
}
