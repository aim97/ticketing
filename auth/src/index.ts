import App from 'express';
import { json } from 'body-parser';

const app = App();

app.use(json());

app.use('/api/users/currentuser', async (req, res) => {
  res.json({
    id: 1,
    name: 'John Doe',
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
