import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Actions, ActionSituation } from "../../../entities/Action";
import { Item } from "../../../entities/Item";

export const RemoveCourseFromCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const repoActions = getRepository(Actions);
    const repoItem = getRepository(Item);

    const actions = await repoActions.findOne({
      user_id: req.id,
      situation: ActionSituation.CA,
    });
    const itemCart = await repoItem.findOne({
      where: { action_id: actions.id, course_id: id },
    });
    if (!itemCart) {
      return res.status(404).json({ message: "Item Not Found" });
    }
    await repoItem.delete(itemCart.id);

    const itemsCart = await repoItem.find({
      where: { action_id: actions.id },
    });

    if (itemsCart.length <= 0) {
      await repoActions.delete(actions.id);
      return res.status(200).json({ message: "removed from cart" });
    }
    const totalItemsPrice = await repoItem
      .createQueryBuilder("item")
      .select("SUM(item.total_price)", "total")
      .where("action_id = :action", { action: actions.id })
      .getRawOne();
    const totalItemsDiscount = await repoItem
      .createQueryBuilder("item")
      .select("SUM(item.discount)", "discount")
      .where("action_id = :action", { action: actions.id })
      .getRawOne();
    const { total } = totalItemsPrice;
    const { discount } = totalItemsDiscount;
    actions.final_price = total - discount;
    actions.discount = discount;
    actions.total_price = total;
    await repoActions.save(actions);

    return res.status(200).json({ message: "removed from cart" });
  } catch {
    return res
      .status(500)
      .json({ message: "Error when deleting item from cart" });
  }
};
