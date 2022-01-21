import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Courses } from "../../../entities/Course";

export const SearchCoursesController = async (req: Request, res: Response) => {
    try {
      const repoCourse = getRepository(Courses);
      const search = repoCourse.createQueryBuilder('courses');
      //receives a string as parameter to search
      if (req.query.s) { 
        search.where("courses.name LIKE :s OR courses.description LIKE :s", { s:`%${req.query.s}%` })
        search.select([
          'courses.id', 
          'courses.name', 
          'courses.description', 
          'courses.duration',
          'courses.price',
          'courses.cover',
          'courses.created_at',
          'courses.updated_at'
          ])
      }
      const sort: any = req.query.sort;
      //receives asc or desc as parameters to sort 
      if (sort) { 
        search.orderBy("courses.price", sort.toUpperCase());
      }

      return res.json(await search.getMany());
    } catch {
      return res.status(400).json({ message: "Error when searching for courses" });
    }
  };