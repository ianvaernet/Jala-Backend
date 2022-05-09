
import fs from 'fs';
import mongoose from 'mongoose';

export class GridFS
{
    private bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    async upload(fileName: string){
        await fs.createReadStream(`./${fileName}`)
        .pipe(this.bucket.openUploadStream(fileName))
        .on('finish', () => {
            mongoose.connection.close();
        } )
    }

    async download(fileName: string){

        this.bucket.openDownloadStreamByName(fileName)
        .pipe(fs.createWriteStream(`./${fileName}`))
        .on('finish', () => {
            mongoose.connection.close();
        });

    }
}