// dependencies
import React, { useEffect, useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  makeStyles
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

// local modules
import { fetchReservedWishes } from '../../services/wishesService';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export const ReservedWishes = () => {
  const classes = useStyles();
  const [reservedWishes, setReservedWishes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    (async () => {
      const response = await fetchReservedWishes();
      setReservedWishes(response);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <>Cargando</>;

  return (
    <div>
      {reservedWishes.length === 0 ? (
        <p>You haven't reserved any wish</p>
      ) : (
        <>
          <p>Your friend's wishes</p>
          {reservedWishes.map((wish, i) => (
            <ExpansionPanel
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                classes={{ content: classes.content }}>
                <Typography className={classes.heading}>{wish.game.name}</Typography>
                <Typography className={classes.secondaryHeading}>
                  For {wish.owner.username}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>Status: {wish.status}</p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </>
      )}
    </div>
  );
};
