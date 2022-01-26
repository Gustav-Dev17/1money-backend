import { Request, Response } from "express";
import { Users } from "../../../entities/User";
import { getRepository } from "typeorm";
import {resetPassword} from "../../../../utils/passwordReset";

const ResetAdminPasswordController = async (req: Request, res: Response) => {
    try {
        const repo = getRepository(Users);
        const user = await repo.findOne({ email: req.body.email });
        const newPassword = Math.random().toString(36).slice(-10);

        if (!user) {
            return res.status(404).json({ message: "There is no admin account with such email address" });
        }

        user.password = newPassword ? newPassword : user.password;
        resetPassword(user.email, newPassword);
        
        await repo.save(user);
        return res.status(200).json({ message: "Your admin account password has been changed!" });
      } catch {
        return res.status(500).json({ message: "Error" });
    }
}
export default ResetAdminPasswordController;