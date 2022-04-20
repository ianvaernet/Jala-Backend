import express from 'express';

const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});
