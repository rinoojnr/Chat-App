const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const dotenv = require('dotenv');
dotenv.config();

const accessKeyId = process.env.IAM_USER_KEY;
const secretAccessKey =  process.env.IAM_USER_SECRET;
const bucketName = process.env.BUCKET_NAME;

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

exports.uploadToS3 = async (image, filename) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: filename,
            Body: image,
            ACL: "public-read",
            ContentType: "image/jpeg",
          };
          const data = await s3Client.send(new PutObjectCommand(params));
          const publicUrl = `https://${params.Bucket}.s3.eu-north-1.amazonaws.com/${params.Key}`;
          return publicUrl;
          
    } catch (error) {
        console.error('uploading failed:', error);
    }
}
