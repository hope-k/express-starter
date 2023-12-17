import express from 'express';
import { SignIn, SignUp } from '../controllers/auth/AuthController.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router();

// @desc    Auth with Credentials
// @route   GET /auth/
router.post('/auth/signin', SignIn);
router.post('/auth/signup', SignUp);
router.get('/auth/user', protectedRoute, (req, res) => {
    res.json(req.user).status(200);
})

export default router;



