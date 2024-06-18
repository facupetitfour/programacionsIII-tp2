import { Router } from 'express';
import AuthController from '../controller/authController';
const router = Router();
const controller = new AuthController
/* GET home page. */
router.get('/logIn', controller.handleLogin);
router.get('/register',controller.handleRegister)

export default router;
