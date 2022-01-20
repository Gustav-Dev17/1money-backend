import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";

export const GetCoursesPurchaseController = async (
  req: Request,
  res: Response
) => {
  try {
    const repoActions = getRepository(Actions);
    const repoItems = getRepository(Item);
    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.CO,
    });
    const items = await repoItems.find({ action_id: actions.id });
    return res.json(items);
  } catch {
    return res.status(400).json({ message: "Error when listing courses" });
  }
};
