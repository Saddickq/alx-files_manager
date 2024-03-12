import { Router } from "express";
import { AppController } from "../controllers/AppController";

const router = Router();

router.get('/status', AppController.getStatus);
router.post('/users', UsersController.postNew)