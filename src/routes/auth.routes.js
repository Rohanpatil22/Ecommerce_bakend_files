import { Router} from "express";
import { getProfile, login, logout, signUp } from "../controllers.js/auth.controller";
import {isLoggedIn} from "../middlewares/auth.midddleware.js"
const router=Router();

router.post("/signUp",signUp);
router.post("/login",login);
router.get("/logout",logout);

router.get("/profile", isLoggedIn ,getProfile);

export default router;