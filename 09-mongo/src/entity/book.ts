import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IBook {
  author: string;
  title: string;
  date: Date;
}

const bookSchema = new Schema<IBook>({
  author: {
    type: String,
  },
  title: {
    type: String,
    default: 'No title',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IBook>('Book', bookSchema);
