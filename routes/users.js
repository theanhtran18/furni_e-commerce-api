import { Router } from "express";
import { editProfile, getUser } from "../controllers/users.js";

const userRouter = Router();

userRouter.post("/user/profile", getUser);
userRouter.post("/user/editProfile", editProfile);

export default userRouter;
