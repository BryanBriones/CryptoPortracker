import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const CryptoTicker = (props) => {
  const classes = useStyles();
  const { crypto } = props;

  return (
    <Grid item xs={12} md={4}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {crypto.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {crypto.rank} - {crypto.currency}
              </Typography>
              {/* <Typography variant="subtitle1" paragraph>
               ${Number(Number(crypto.market_cap)/1000000000).toFixed(2)} B
              </Typography> */}
              <Typography variant="subtitle1" paragraph>
               ${Number(crypto.price).toFixed(2)}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                 More info
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={crypto.logo_url} title={crypto.name} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// CryptoTicker.propTypes = {
//   crypto: PropTypes.string,
// };

export default CryptoTicker;
