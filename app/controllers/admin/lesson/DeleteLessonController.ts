import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import aws from "aws-sdk";
const s3 = new aws.S3();

export const DeleteLessonController = async (req: Request, res: Response) => {
    try {
      const repo = getRepository(Lessons);
      const { name, sequence, duration, resourse } = req.body;
      const lesson = await repo.findOne({ id: req.params.id });
      if (!req.file) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      const { originalname: size, key, location: url } = req.file;
        lesson.name = name ? name : lesson.name;
        lesson.sequence = sequence ? sequence : lesson.sequence;
        lesson.duration = duration ? duration : lesson.duration;
        lesson.resource = resourse ? resourse : lesson.resource;
        s3.deleteObject({
            Bucket: "uploadfileteste2",
            Key: lesson.key,
        }).promise();
        lesson.video = url;
        lesson.key = key;
      await repo.delete(lesson);
      return res.status(200).json({ message: "Lesson deleted from the course!" });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  };
