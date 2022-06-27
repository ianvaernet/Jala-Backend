import mongoose from 'mongoose';

export const mongoDatasource = {
  async initialize() {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  },
};
