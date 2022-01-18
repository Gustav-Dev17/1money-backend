import { getRepository } from "typeorm";

import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";
import { Courses } from "../../../entities/Course";

export const AddCourseToCart = async (req: Request, res: Response) => {
  try {
    const { payment, course_id } = req.body;
    const repoCourse = getRepository(Courses);
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);
    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.CA,
    });

    const course = await repoCourse.findOne({ id: course_id });
    if (!course_id)
      return res.status(404).json({ message: "Course not found" });

    if (!actions) {
      const actionCart = repoActions.create({
        discount: course.discount,
        payment,
        final_price: course.price - course.discount,
        total_price: course.price,
        user_id: req.id,
        situation: ActionSituation.CA,
      });
      const itemCart = repoItem.create({
        action_id: actionCart.id,
        course_id: course_id,
        total_price: course.price,
        discount: course.discount,
      });
      await repoActions.save(actionCart);
      await repoItem.save(itemCart);
      return res.status(201).json(itemCart);
    }
    const newActions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.CA,
    });

    const itemCartExists = await repoItem.findOne({
      action_id: newActions.id,
      course_id: course_id,
    });
    if (itemCartExists) {
      return res.status(409).json({ message: "Item exists in cart" });
    }

    const itemCart = repoItem.create({
      action_id: newActions.id,
      course_id: course_id,
      total_price: course.price,
      discount: course.discount,
    });
    await repoItem.save(itemCart);
    const totalItemsPrice = await repoItem
      .createQueryBuilder("item")
      .select("SUM(item.total_price)", "total")
      .where("action_id = :action", { action: newActions.id })
      .getRawOne();
    const totalItemsDiscount = await repoItem
      .createQueryBuilder("item")
      .select("SUM(item.discount)", "discount")
      .where("action_id = :action", { action: newActions.id })
      .getRawOne();
    const { total } = totalItemsPrice;
    const { discount } = totalItemsDiscount;
    const final = total - discount;
    newActions.total_price = total;
    newActions.discount = discount;
    newActions.final_price = final;
    await repoActions.save(newActions);
    return res.json(itemCart);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error" });
  }
};
