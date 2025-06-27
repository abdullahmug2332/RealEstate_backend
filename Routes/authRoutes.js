import express from 'express';
import { login } from '../Controllers/authController.js';
import { checktoken } from '../Controllers/authController.js';

const router = express.Router();

router.post('/auth', login);
router.post('/checktoken', checktoken);

export default router;
