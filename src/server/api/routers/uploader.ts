import S3 from "aws-sdk/clients/s3";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const uploaderRouter = createTRPCRouter({
  getUrl: protectedProcedure
    .input(z.object({ fileName: z.string(), fileType: z.string() }))
    .mutation(({ input }) => {
      const s3 = new S3({
        apiVersion: "2006-03-01",
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
      });

      const fileName = new Date().toDateString() + "-" + input.fileName;

      return s3.createPresignedPost({
        Bucket: env.AWS_BUCKET_NAME,
        Fields: {
          key: fileName,
          "Content-Type": input.fileType,
        },
        Expires: 60, // seconds
        Conditions: [
          ["content-length-range", 0, 12582912], // up to 12 MB
        ],
      });
    }),
});
