# Subtitles and Torrents API


#### Search Subtitles using IMDB_ID.
```
  /subtitle-search?lang=eng&imdbid=tt0848228
  /subtitle-search?lang=ita&tmdbid=55614
  /subtitle-search?lang=spa&query=the avengers
  
  /subtitle-search?lang=spa&imdbid=tt3107288&s=01&e=01
  /subtitle-search?lang=spa&tmdbid=60735&s=01&e=01
  /subtitle-search?lang=spa&query=the flash&s=01&e=01
  
```


####  Search Movie Torrent using IMDB_ID. 
```
  /imdb-torrent-search?id=tt0848228
```


####  Use Xtorrent to search Movies using title, type, and quality=720|1080|3D
```
  /xtorrent?title=the+avengers+2012&type=Movies&quality=720
```

####  Use Xtorrent to search TV using title, type, season, episode and quality=720|1080|3D
```
  /xtorrent?title=the+umbrella+academy&type=TV&s=01&e=01
```

