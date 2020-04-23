import React, { useState, useContext, useEffect } from 'react';
import { fetchAlbumID } from '../../services/spotifyService';
import { TokenContext } from '../../contexts/tokenContext';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { Pause, SkipNext, SkipPrevious, PlayArrow } from '@material-ui/icons';
import { findCover, filterTracks } from '../../helpers/listsHelpers';
import { ThemeContext } from 'styled-components';

const useStyles = makeStyles(theme => ({
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cover: {
    width: 300,
    backgroundSize: 'contain'
  },
  playIcon: {
    height: 38,
    width: 38
  },
  root: ownTheme => ({
    borderColor: ownTheme.main.secondary,
    border: '0.1em solid',
    display: 'flex'
  })
}));

export const Soundtrack = ({ name }) => {
  const { token } = useContext(TokenContext);
  const [tracks, setTracks] = useState();
  const [cover, setCover] = useState();
  const [notFound, setNotFound] = useState(false);
  const [currentNumTrack, setCurrentNumTrack] = useState(0);
  const [playingTrack, setPlayingTrack] = useState({ isPlaying: false, song: '', audio: '' });

  const ownTheme = useContext(ThemeContext);
  const classes = useStyles(ownTheme);

  useEffect(() => {
    (async () => {
      if (token && name) {
        try {
          const response = await fetchAlbumID(name, token);
          console.log('respuesta en el useEffect', response);

          const tracksFormatted = filterTracks(response.tracks);
          setTracks(tracksFormatted);

          console.log(tracksFormatted);
          // find img with specific width & set it to cover if found
          const retrievedCover = findCover(response.cover, 300);
          retrievedCover ? setCover(retrievedCover.url) : setCover('');
        } catch (error) {
          setNotFound(true);
        }
      }
    })();
  }, []);

  const playSong = previewUrl => {
    let audio = new Audio(previewUrl);
    console.log(previewUrl);
    if (!playingTrack.isPlaying) {
      console.log('playing');
      audio.play();
      setPlayingTrack({
        isPlaying: true,
        song: previewUrl,
        audio
      });
    } else {
      console.log('stopping');
      playingTrack.audio.pause();
      setPlayingTrack({
        isPlaying: false
      });
    }
  };

  if (notFound) return <p>Soundtrack not found</p>;

  return (
    <div>
      {tracks && (
        <Card className={classes.root} elevation={3}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {tracks[currentNumTrack].songName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {tracks[currentNumTrack].artist}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="previous">
                <SkipPrevious />
              </IconButton>
              <IconButton
                aria-label="play/pause"
                onClick={() => playSong(tracks[currentNumTrack].audio)}>
                {!playingTrack.isPlaying ? (
                  <PlayArrow className={classes.playIcon} />
                ) : (
                  <Pause className={classes.playIcon} />
                )}
              </IconButton>
              <IconButton aria-label="next">
                <SkipNext />
              </IconButton>
            </div>
          </div>
          {cover && (
            <CardMedia
              className={classes.cover}
              image={cover}
              title="Live from space album cover"
            />
          )}
        </Card>
      )}
    </div>
  );
};
