import { Router } from "express";
import { 
    getUsersController,
    getUsertByIdController,
    addUserController,
    updateUser,
    deleteUser,
    getAdminsController,
    getPremiumsController,
    getNormalController
} from "../controllers/user.controller";


const router = Router();

router.get("/", getUsersController);

router.get("/:uid", getUsertByIdController);

router.post("/", addUserController);

router.put("/:uid", updateUser);

router.delete("/:uid", deleteUser);

router.get('/Admins-User', getAdminsController);

router.get('/Premium-User', getPremiumsController);

router.get('/Normal-User', getNormalController);

export default router;