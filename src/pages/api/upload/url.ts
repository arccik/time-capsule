import S3 from "aws-sdk/clients/s3";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
  });

  const post = s3.createPresignedPost({
    Bucket: env.AWS_BUCKET_NAME,
    Fields: {
      key: req.query.file,
      "Content-Type": req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 12582912], // up to 12 MB
    ],
  });

  res.status(200).json(post);
}
