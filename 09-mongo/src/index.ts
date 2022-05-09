import { DbConnection } from '../db-connection';
import BookDatAccess from './data-access/book-data-access';
import { Book } from './entity/bookModel';
import { GridFS } from './data-access/grid-fs';

class Test {

    async configureDb() {
        let dbConnection = new DbConnection();
        await dbConnection.connect();



        //TEST
        let bookDatAccess = new BookDatAccess();

        let book = new Book();
        book.author = 'test';
        book.date = new Date();
        book.title = 'design patterns';

        let createdBook = await bookDatAccess.save(book);

        let readedBook = await bookDatAccess.read(createdBook.id);
        console.log(readedBook)

        // readedBook.title = 'UPDATED';
        // await bookDatAccess.update(readedBook._id, readedBook);
        
        // await bookDatAccess.remove(readedBook._id);

        // const gridFS = new GridFS();
        //await gridFS.upload('helloWorld.txt');
        //await gridFS.upload('mongodb-windows-x86_64-5.0.8-signed.msi');
        
        // await gridFS.download('mongodb-windows-x86_64-5.0.8-signed.msi');


        //optional
        //await dbConnection.disconnect();
    }

}

new Test().configureDb()