require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4040;

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const postsRouter = require('./routers/posts/posts');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');

app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`\n[SERVER] Running on http://localhost:${port}\n`);
});
