import { getRepository } from "typeorm";
import { Courses } from "../../../entities/Course";
import { Request, Response } from "express";

const GetCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const repoCourse = getRepository(Courses);
    const course = await repoCourse.findOne({ id: id });
    return res.json({
      name: course.name,
      description: course.description,
      duration: course.duration,
      price: course.price,
      cover: course.cover,
      prevideo: course.prevideo,
    });
  } catch {
    return res.status(500).json({ message: "Error " });
  }
};

export default GetCourseController;