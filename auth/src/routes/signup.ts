import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email') // look for property and validate it
      .isEmail()
      .withMessage('Email must be valid'),
    body('username')
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage('Username must be between 2 and 20 characters'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    const usernameInUse = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    if (usernameInUse) {
      throw new BadRequestError('Username already taken');
    }

    const user = User.build({ username, email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
