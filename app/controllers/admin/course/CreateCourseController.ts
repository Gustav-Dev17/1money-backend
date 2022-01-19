import { getRepository } from "typeorm";
import { Courses } from "../../../entities/Course";
import { Request, Response } from "express";

export const CreateCourseController = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price, discount, cover, prevideo } =
      req.body;
    const repo = getRepository(Courses);
    if (await repo.findOne({ name })) {
      return res.status(409).json({ message: "Course name already exists!" });
    }
    const course = repo.create({
      name,
      description,
      duration,
      price,
      discount,
      cover,
      prevideo,
    });
    await repo.save(course);
    return res.json(course);
  } catch {
    return res.status(400).json({ message: "Error when creating course" });
  }
};
