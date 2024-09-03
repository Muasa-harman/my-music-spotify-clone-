import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDto } from './create-playlist.dto';


@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private playListRepo: Repository<Playlist>,

        @InjectRepository(Song)
        private songsRepo: Repository<Song>,

        @InjectRepository(User)
        private userRepo: Repository<User>,
    ){}

    async create(playListDto: CreatePlayListDto): Promise<Playlist>{
        const playList = new Playlist();
        playList.name = playListDto.name;

        // songs will be the array of ids that we are getting from the DTO object
        const songs = await this.songsRepo.findByIds(playListDto.songs);
        // set the relation for the songs with playlist entity
        playList.songs = songs;
        
        // A user will be id of the user we are getting from the request
        // when we implemented the user authentication this id will become the loggedIn user
        const user = await this.userRepo.findOneBy({id: playListDto.user});
        playList.user = user;

        return this.playListRepo.save(playList);
    }
}
