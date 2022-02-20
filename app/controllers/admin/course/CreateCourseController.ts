import { getRepository } from "typeorm";
import { Courses } from "../../../entities/Course";
import { Request, Response } from "express";
import {
  uploadFileImage,
  uploadFileVideo,
} from "../../../../utils/uploadFiles";

export const CreateCourseController = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price, discount } = req.body;
    const repo = getRepository(Courses);
    if (await repo.findOne({ name })) {
      return res.status(409).json({ message: "Course name already exists!" });
    }
    const pre_videoUpload = req.files.pre_video[0];
    const coverUpload = req.files.cover[0];
    if (!coverUpload) throw new Error();
    if (!pre_videoUpload) throw new Error();
    if (pre_videoUpload.mimetype.split("/")[1] !== "mp4") {
      throw new Error();
    }

    const cover = await uploadFileImage(coverUpload.buffer, coverUpload);
    const pre_video = await uploadFileVideo(
      pre_videoUpload.buffer,
      pre_videoUpload
    );

    const course = repo.create({
      name,
      description,
      duration,
      price,
      discount,
      cover: cover.Location,
      prevideo: pre_video.Location,
      keycover: cover.Key,
      keyprevideo: pre_video.Key,
    });
    await repo.save(course);
    return res.json(course);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error when creating course" });
  }
};
