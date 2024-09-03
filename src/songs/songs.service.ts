import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
    // local db
    // local array

    private readonly songs = [];

    create(song){
        // save songs in the db
        this.songs.push(song);
        return this.songs;
    }

    findAll(){
        // fetch the songs from the db
        return this.songs;
    }
    findOne(){
        return this.songs;
    }
}
