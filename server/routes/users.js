import { Router } from 'express';
import UserController from '../controller/userController.js'
import RoutesAuth from '../middleware/routesAuth.js';

const router = Router();
const controller = new UserController()
const middleware = new RoutesAuth()

router.get('/', middleware.handleValidateToken ,controller.handleGetAllItems);
router.get('/', controller.handleGetItem);
router.post('/', controller.handleCreateItem);
router.put('/', controller.handleUpdateItem);
router.delete('/', controller.handleDeleteItem);

export default router;
