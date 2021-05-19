import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CryptoTicker from './Cryptoticker';

const useStyles = makeStyles((theme) => ({
  toolbar: {
   // borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title, isloaded, apinextpage, currentcrypto, refreshcrypto} = props;
  const [originalCryptoSet, setoriginalCryptoSet] = useState();


  const GetApiNextPage = (section) => {

    
    apinextpage(section,isloaded);


  }


  const handleSearchCrypto = (currentcrypto,event) =>
  {

   
    if(event.target.value!=""){
      setoriginalCryptoSet(currentcrypto);
      refreshcrypto(event.target.value,currentcrypto);
    }

    if(event.target.value==""){

      refreshcrypto(event.target.value,originalCryptoSet);

    }


    
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
           <TextField id="standard-search" label={title} type="search"  onChange={handleSearchCrypto.bind(this,currentcrypto)}   fullWidth    InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>   
          )
        }} 
        inputProps={{style: {fontSize: 40}}} // font size of input text
        InputLabelProps={{style: {fontSize: 20}}} // font size of input label
        
        
        />
        </Typography>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Button
            color="inherit"
            key={section.title}
            variant="body2"
            className={classes.toolbarLink}
            onClick ={GetApiNextPage.bind(this,section)}
          >
            {section.title}
          </Button>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
  currentcrypto: PropTypes.array,
  apinextpage: PropTypes.func,
  refreshcrypto: PropTypes.func

};
