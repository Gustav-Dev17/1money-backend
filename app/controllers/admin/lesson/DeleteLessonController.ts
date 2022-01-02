import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import aws from "aws-sdk";
const s3 = new aws.S3();

export const DeleteLessonController = async (req: Request, res: Response) => {
    try {
      const repo = getRepository(Lessons);
      const lesson = await repo.findOne({ id: req.params.id });
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }    
      s3.deleteObject({
        Bucket: "uploadfileteste2",
        Key: lesson.key,
      }).promise();
      await repo.delete(lesson);
      return res.status(200).json({ message: "Lesson deleted from the course!" });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  };
