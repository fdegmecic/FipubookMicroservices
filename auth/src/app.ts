import express from 'express';
import 'express-async-errors';
import cookieSession from "cookie-session";
import {errorHandler, NotFoundError} from '@fdfipubook/common';

import {authRouter} from "./routes/auth";

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)
app.use(authRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export {app};
