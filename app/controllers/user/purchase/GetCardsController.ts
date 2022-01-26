import { getRepository } from "typeorm";
import { Cards } from "../../../entities/Card"; 
import { Request, Response } from "express";

export const GetCardsController = async (req: Request, res: Response) => {
  try {
    const repoCards = getRepository(Cards);
    const cards = await repoCards.find({ order: { created_at: "ASC" } });
    return res.json(cards);
  } catch {
    return res.status(400).json({ message: "Error when listing cards" });
  }
};