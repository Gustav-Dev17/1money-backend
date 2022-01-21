import Aws from "aws-sdk";
export declare const uploadPhotoProfile: (buffer: any, photo: any) => Promise<Aws.S3.ManagedUpload.SendData>;
export declare const deletePhoto: (key: any) => Promise<void>;
