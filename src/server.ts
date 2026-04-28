import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { startMailScheduler } from './jobs/mailScheduler.job.js';

const startServer = async () => {
  try {
    await connectDB();
    startMailScheduler();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
