import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}
@Post()
create(@Body() createSongDto: CreateSongDto){
    return this.songsService.create(createSongDto);
    }

@Get()
findAll(){
    return this.songsService.findAll();
}    

@Get(':id')
findOne(){
    return this.songsService.findOne();
}

@Put(':id')
update(){
    return 'fetch song based on the id and update';
}

@Delete(':id')
delete(){
    return 'fetch song based on the id and delete';
}
}
