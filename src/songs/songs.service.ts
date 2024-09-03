import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Artist } from 'src/artists/artist.entity';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>
    ){}

    async create(songDto: CreateSongDto): Promise<Song>{
        const song = new Song();
        song.title = songDto.title;
        song.artists = songDto.artists;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;
        song.releasedDate = songDto.releasedDate;

        console.log(songDto.artists);

        // find all the artists on the song based on the ids
        const artists = await this.artistsRepository.findByIds(songDto.artists);
        console.log(artists);
        // set the relation with the artist and songs
        song.artists = artists;
        return this.songsRepository.save(song);
    }
    findAll(): Promise<Song[]>{
        return this.songsRepository.find();
    }
    findOne(id: number): Promise<Song>{
        return this.songsRepository.findOneBy({id});
    }
    remove(id: number): Promise<DeleteResult>{
        return this.songsRepository.delete(id);
    }
    update(id: number,recordToUpdate: UpdateSongDto): Promise<UpdateResult>{
        return this.songsRepository.update(id, recordToUpdate);
    }
    async paginate(){}

   

}
