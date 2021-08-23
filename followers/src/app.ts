import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from "cookie-session";

import {errorHandler, NotFoundError, currentUser} from '@fdfipubook/common';
import {getUserFollowersRouter} from "./routes/getUserFollowers";
import {followUserRouter} from "./routes/followUser";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(currentUser);

app.use(followUserRouter);
app.use(getUserFollowersRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export {app};
