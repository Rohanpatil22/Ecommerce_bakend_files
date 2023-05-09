import { Router } from "express";
import authRoute from "../routes/auth.routes"
const router=Router();

router.use("/auth",authRoute)

export default router;
