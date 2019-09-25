import express from 'express';
import config from 'dotenv';
import bodyParser from 'body-parser';

import bookRoutes from './server/routes/BookRoutes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 7000;

app.use('/api/v1/books', bookRoutes);

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'this is the api'
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
