import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Users } from "../../../entities/User";
import { getRepository } from "typeorm";
import {resetPassword} from "../../../../utils/passwordReset";

const ResetPasswordController = async (req: Request, res: Response) => {
    try {
        const { id } = req
        const repo = getRepository(Users);
        const { email, password } = req.body;
        const userEmail = await repo.findOne({email: email});
        const newPassword = Math.random().toString(36).slice(-10);
    
        if (userEmail) {
            const user = await repo.findOne(id);
            const generatePassword = await bcrypt.hash(newPassword, 10);
            user.password = generatePassword ? generatePassword : user.password;
            await resetPassword(user.email, newPassword);
            await repo.save(user);
        }
        if (!userEmail) {
            return res.status(404).json({ message: "Email not found" });
        }
    
        return res.status(200).json({ message: "Your account password has been successfully changed!" });
      } catch {
        return res.status(500).json({ message: "Error" });
      }
}
export default ResetPasswordController;