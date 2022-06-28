import mongoose from 'mongoose';

export const mongoDatasource = {
  async initialize() {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      authSource: 'admin',
    });
  },
};
