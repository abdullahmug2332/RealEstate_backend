import express from 'express';
import { createUser, deleteUser, getAllUsers, login } from '../Controllers/authController.js';
import { checktoken } from '../Controllers/authController.js';

const router = express.Router();

router.post('/auth', login);
router.post('/checktoken', checktoken);
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
export default router;
