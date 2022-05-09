import BookSchema from "../entity/book";
import { Book } from "../entity/bookModel";

export default class BookDatAccess {

    async save(bookToSave: Book) {
        const bookSchema = new BookSchema(bookToSave);
        return await bookSchema.save();
    }

    async read(id: string) {
        return await BookSchema.findById(id).lean();
    }

    async update(id: string, bookToSave: Book) {
        return await BookSchema
            .findByIdAndUpdate(id, bookToSave)
            .lean();
    }

    async remove(id: string) {
        return await BookSchema
            .findByIdAndRemove(id)
            .lean();
    }

}