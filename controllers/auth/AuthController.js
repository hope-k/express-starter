import User from '../../models/user/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { asyncErrorHandler } from '../../middlewares/asyncErrorHandler.js';
import { successRes, errorRes } from '../../utils/response.js';

const SignUp = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(errorRes('User already exists'));
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    return res.json(successRes('User created successfully'));

})


const SignIn = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json(errorRes('Incorrect email or password'));
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json(errorRes('Incorrect email or password'));
    }

    // If authentication is successful, create a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    return res.json(successRes('User logged in successfully', { token }));

})

export {
    SignUp,
    SignIn
}
