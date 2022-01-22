import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";

export const RemoveCourseFromFavoriteController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);

    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.FA,
    });
    const itemFavorite = await repoItem.findOne({
      where: { action_id: actions.id, course_id: id },
    });
    if (!itemFavorite) {
      return res.status(404).json({ message: "Item Not Found" });
    }
    await repoItem.delete(itemFavorite.id);

    const itemsFavorites = await repoItem.find({
      where: { action_id: actions.id },
    });

    if (itemsFavorites.length <= 0) {
      await repoActions.delete(actions.id);
      return res.status(200).json({ message: "removed from cart" });
    }
    await repoActions.save(actions);

    return res.status(200).json({ message: "removed from cart" });
  } catch {
    return res
      .status(500)
      .json({ message: "Error when deleting item from cart" });
  }
};
