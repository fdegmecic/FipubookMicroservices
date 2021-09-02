import express from 'express';
import 'express-async-errors';
import cookieSession from "cookie-session";

import {errorHandler, NotFoundError, currentUser} from '@fdfipubook/common';
import {createPostRouter} from "./routes/createPost";
import {updatePostRouter} from "./routes/updatePost";
import {getUserPosts} from "./routes/getUserPosts";
import {likePostRouter} from "./routes/likePost";
import {unlikePostRouter} from "./routes/unlikePost";

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(currentUser);

app.use(createPostRouter);
app.use(updatePostRouter);
app.use(getUserPosts);
app.use(likePostRouter);
app.use(unlikePostRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export {app};
