import App from 'express';
import { json } from 'body-parser';

const app = App();

app.use(json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
