import { Router } from 'express';
import UserController from '../controller/userController.js'

const router = Router();
const controller = new UserController()

router.get('/', controller.handleGetAllItems);
router.get('/', controller.handleGetItem);
router.post('/', controller.handleCreateItem);
router.put('/', controller.handleUpdateItem);
router.delete('/', controller.handleDeleteItem);

export default router;
