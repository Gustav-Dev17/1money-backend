import { Request, Response } from "express";
declare const GetAdminController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default GetAdminController;
