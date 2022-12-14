import Aws from "aws-sdk";

const s3 = new Aws.S3();

export const uploadPreVideos = async (buffer, photo) => {
  const awsUpload = await s3
    .upload(
      {
        Bucket: "uploadfileteste2",
        Key: `${Date.now()}-${photo.originalname}`,
        Body: buffer,
        ACL: "public-read",
        ContentType: "video/mp4",
      },
      (err) => {
        if (err) {
          console.log("Error", err);
        }
      }
    )
    .promise();
  return awsUpload;
};

export const deletePreVideo = async (key) => {
  s3.deleteObject({
    Bucket: "uploadfileteste2",
    Key: key,
  })
    .promise()
    .then(() => {
      console.log("Enviado");
    })
    .catch((err) => {});
};