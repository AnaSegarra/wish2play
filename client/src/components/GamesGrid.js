// dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridListTile, GridListTileBar, makeStyles } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// styled components
import { StyledGridListTile } from '../styles/Profile.styled';

const useStyles = makeStyles(theme => ({
  root: theme => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.main.background,
    margin: '2em 0'
  }),
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
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    textAlign: 'center'
  }
}));

export const GamesGrid = ({ gamesArr, type, userID }) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {gamesArr.map(game => (
          <GridListTile key={game._id} style={{ height: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={game.image}
                alt={game.name}
                height="300"
                width={gamesArr.length > 1 ? 'auto' : '100%'}
              />
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
            />
          </GridListTile>
        ))}
        <StyledGridListTile theme={theme} style={{ height: '300px' }}>
          <Link to={`/${type}/${userID}`}>See full list</Link>
        </StyledGridListTile>
      </GridList>
    </div>
  );
};
