import { Request, Response } from "express";
declare const LoginUserController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default LoginUserController;
