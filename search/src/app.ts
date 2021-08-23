import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import {errorHandler, NotFoundError} from '@fdfipubook/common';
import {searchUsersRouter} from "./routes/searchUsers";

const app = express();
app.use(json());

app.use(searchUsersRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export {app};
