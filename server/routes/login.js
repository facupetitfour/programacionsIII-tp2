import { Router } from 'express';
import AuthController from '../controller/authController.js';
const router = Router();
const controller = new AuthController

router.post('/logIn', controller.handleLogin);
router.post('/register',controller.handleRegister);
router.post('/logOut',controller.handleLogOut);

export default router;
