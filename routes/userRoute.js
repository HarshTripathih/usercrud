import express from 'express'
import { createUser, registerUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js"
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);

// Protected routes :

router.get('/',authMiddleware, getAllUsers);
router.post('/', authMiddleware, createUser);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUserById);
router.delete('/:id', authMiddleware, deleteUserById);

export default router;