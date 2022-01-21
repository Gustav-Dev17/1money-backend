import { getRepository } from "typeorm";

import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";
import { Courses } from "../../../entities/Course";

export const AddCourseToFavoritesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { course_id } = req.body;
    const repoCourse = getRepository(Courses);
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);
    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.FA,
    });

    const course = await repoCourse.findOne({ id: course_id });
    if (!course_id)
      return res.status(404).json({ message: "Course not found" });

    if (!actions) {
      const actionFavorite = repoActions.create({
        discount: 0,
        final_price: 0,
        total_price: 0,
        user_id: req.id,
        situation: ActionSituation.FA,
      });
      const itemCart = repoItem.create({
        action_id: actionFavorite.id,
        course_id: course_id,
        total_price: course.price,
        discount: course.discount,
      });
      await repoActions.save(actionFavorite);
      await repoItem.save(itemCart);
      return res.status(201).json(itemCart);
    }
    const newActions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.FA,
    });
    const itemCartExists = await repoItem.findOne({
      action_id: newActions.id,
      course_id: course_id,
    });
    if (itemCartExists) {
      return res.status(409).json({ message: "Item exists in favorit" });
    }

    const itemFavorite = repoItem.create({
      action_id: newActions.id,
      course_id: course_id,
      total_price: course.price,
      discount: course.discount,
    });
    await repoItem.save(itemFavorite);

    await repoActions.save(newActions);
    return res.json(itemFavorite);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error" });
  }
};
