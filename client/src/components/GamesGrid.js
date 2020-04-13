// dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles } from '@material-ui/core';
import { ThemeContext } from 'styled-components';
import { Gamepad } from 'styled-icons/remix-fill';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap'
  },
  title: theme => ({
    color: theme.main.tertiary,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'none'
  }),
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

export const GamesGrid = ({ gamesArr }) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  console.log('los juegos del slider', gamesArr);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {gamesArr.map(game => (
          <GridListTile key={game._id} style={{ height: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={game.image} alt={game.name} height="300" />
            </div>
            <GridListTileBar
              classes={{
                root: classes.titleBar
              }}
              title={
                <Link to={`/games/${game._id}`} className={classes.title}>
                  {game.name}
                </Link>
              }
              actionIcon={
                <IconButton aria-label={`${game._id}`}>
                  <Gamepad size="25" color={theme.main.tertiary} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
        <GridListTile style={{ height: '300px' }}>
          <p>See full list</p>
        </GridListTile>
      </GridList>
    </div>
  );
};
