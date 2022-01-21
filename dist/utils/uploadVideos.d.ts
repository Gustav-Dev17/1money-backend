import Aws from "aws-sdk";
export declare const uploadVideos: (buffer: any, photo: any) => Promise<Aws.S3.ManagedUpload.SendData>;
export declare const deleteVideo: (key: any) => Promise<void>;
