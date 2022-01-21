import { Request, Response, NextFunction } from "express";
export declare const verifyTokenAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
