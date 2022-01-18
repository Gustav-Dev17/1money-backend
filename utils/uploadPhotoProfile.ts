import Aws from "aws-sdk";

const s3 = new Aws.S3();

export const uploadPhotoProfile = async (buffer, photo) => {
  const awsUpload = await s3
    .upload(
      {
        Bucket: "uploadfileteste2",
        Key: `${Date.now()}-${photo.originalname}`,
        Body: buffer,
        ACL: "public-read",
        ContentType: "image/jpg image/png",
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

export const deletePhoto = async (key) => {
  s3.deleteObject({
    Bucket: "uploadfileteste2",
    Key: key,
  })
    .promise()
    .then(() => {})
    .catch((err) => {});
};
