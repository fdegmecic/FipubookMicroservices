import express, {Request, Response} from 'express';
import {User} from "../models/user";

const router = express.Router();

router.get('/api/search', async (req: Request, res: Response) => {
    const users = await User.find();

    res.send(users);
})

export {router as searchUsersRouter}