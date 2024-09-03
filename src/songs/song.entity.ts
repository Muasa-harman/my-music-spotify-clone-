import { Playlist } from "src/playlists/playlist.entity";
import { JoinTable, ManyToMany, ManyToOne } from "typeorm";


export class Playlist{
@Column('text')
lyrics: string;

@ManyToMany(()=> Artist, (artist)=>artist.songs,{cascade:})
@JoinTable({name: 'songs_artist'})
artists: Artist[];

// many songs can belong to playlist for each unique user
@ManyToOne(()=>Playlist,(playlist)=> playlist.songs)
playlist: Playlist; 

}

