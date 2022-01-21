import { Request, Response } from "express";
declare const GetUserController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default GetUserController;
