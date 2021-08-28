import express from 'express';
import 'express-async-errors';
import cookieSession from "cookie-session";

import {errorHandler, NotFoundError, currentUser} from '@fdfipubook/common';
import {createPostRouter} from "./routes/createPost";
import {updatePostRouter} from "./routes/updatePost";
import {getPostRouter} from "./routes/getPost";
import {getPostsRouter} from "./routes/getPosts";

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
app.use(getPostRouter);
app.use(getPostsRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export {app};
