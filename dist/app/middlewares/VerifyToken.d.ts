import { Request, Response, NextFunction } from "express";
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export default verifyToken;
