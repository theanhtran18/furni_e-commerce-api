import { Router } from "express";
import { editProfile, getUser } from "../controllers/users.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/user/profile", verifyAccessToken, getUser);
userRouter.put("/user/profile", verifyAccessToken, editProfile);

export default userRouter;
