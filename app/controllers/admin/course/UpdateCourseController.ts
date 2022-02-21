import { getRepository } from "typeorm";
import { Courses } from "../../../entities/Course";
import { Request, Response } from "express";
import {
  uploadFileImage,
  uploadFileVideo,
} from "../../../../utils/uploadFiles";

export const UpdateCourseController = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price, discount } = req.body;
    const repo = getRepository(Courses);
    const course = await repo.findOne({ name });
    if (!course) {
      return res.status(404).json({ message: "Course not exists!" });
    }
    const pre_videoUpload = req.files.pre_video ? req.files.pre_video[0] : "";
    const coverUpload = req.files.cover ? req.files.cover[0] : "";
    if (pre_videoUpload) {
      if (req.files.pre_video[0].mimetype.split("/")[1] !== "mp4") {
        return res.status(400).json({ message: "Format video invalid" });
      }
    }

    const coverUrl = coverUpload
      ? (await uploadFileImage(coverUpload.buffer, coverUpload)).Location
      : "";

    const coverKey = coverUpload
      ? (await uploadFileImage(coverUpload.buffer, coverUpload)).Key
      : "";

    const pre_videoUrl = pre_videoUpload
      ? (await uploadFileVideo(pre_videoUpload.buffer, pre_videoUpload))
          .Location
      : "";

    const pre_videoKey = pre_videoUpload
      ? (await uploadFileVideo(pre_videoUpload.buffer, pre_videoUpload)).Key
      : "";

    course.name = name ? name : course.name;
    course.cover = coverUrl ? coverUrl : course.cover;
    course.keycover = coverKey ? coverKey : course.keycover;
    course.prevideo = pre_videoUrl ? pre_videoUrl : course.prevideo;
    course.keyprevideo = pre_videoKey ? pre_videoKey : course.keyprevideo;
    course.discount = discount ? discount : course.discount;
    course.description = description ? description : course.description;
    course.duration = duration ? duration : course.duration;
    course.price = price ? price : course.price;
    await repo.save(course);
    return res.json(course);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error when creating course" });
  }
};
