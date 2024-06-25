import { Router } from 'express';
import UserController from '../controller/userController.js'
import RoutesAuth from '../middleware/routesAuth.js';

const router = Router();
const controller = new UserController()
const middleware = new RoutesAuth()

router.get('/', middleware.handleValidateToken, controller.handleGetAllItems);
router.get('/', middleware.handleValidateToken, controller.handleGetItem);
router.post('/', middleware.handleValidateToken, controller.handleCreateItem);
router.put('/', middleware.handleValidateToken, controller.handleUpdateItem);
router.delete('/', middleware.handleValidateToken, controller.handleDeleteItem);

export default router;
