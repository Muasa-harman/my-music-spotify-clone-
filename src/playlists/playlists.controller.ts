import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDto } from './create-playlist.dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
    constructor(private playListService: PlaylistsService){}
    @Post()
    create(
        @Body()
        playlistDto: CreatePlayListDto,
    ): Promise<Playlist>{
        return this.playListService.create(playlistDto)
    }
}
