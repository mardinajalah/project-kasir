import app from './app';
import { envConfig } from './config/env';

const PORT = Number(envConfig.port) || 4000;

app.listen(PORT, () => {
  console.log('Backend running on http://localhost:' + PORT);
});
