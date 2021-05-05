import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import HeroBannerContent from './HeroBannerContent';
import CryptoTicker from './Cryptoticker';
import Footer from './Footer';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Top 100 Crypto',  url: '#', api: 'https://api.nomics.com/v1/currencies/ticker?key=3a1a095e6cc61206a5db21770bfec693&status=active&sort=rank', indexStart: '1',   indexEnd: '100' },
  { title: 'Next 200 Crypto', url: '#', api: 'https://api.nomics.com/v1/currencies/ticker?key=3a1a095e6cc61206a5db21770bfec693&status=active&sort=rank', indexStart: '101', indexEnd: '200' },
  { title: 'Next 300 Crypto', url: '#', api: 'https://api.nomics.com/v1/currencies/ticker?key=3a1a095e6cc61206a5db21770bfec693&status=active&sort=rank', indexStart: '201', indexEnd: '300' },
  { title: 'Next 400 Crypto', url: '#', api: 'https://api.nomics.com/v1/currencies/ticker?key=3a1a095e6cc61206a5db21770bfec693&status=active&sort=rank', indexStart: '301', indexEnd: '400' },
  { title: 'Next 500 Crypto', url: '#', api: 'https://api.nomics.com/v1/currencies/ticker?key=3a1a095e6cc61206a5db21770bfec693&status=active&sort=rank', indexStart: '401', indexEnd: '500' }
];

const heroBannerContent = {
  title: 'Cryptowatch',
  description:
    "Check out your favorite cryptocurrenies price real time.",
  image: 'https://news.bitcoin.com/wp-content/uploads/2021/01/8-2-million-worth-of-nft-based-artwork-sold-in-the-last-month-of-2020-as-eth-prices-keep-rallying.jpg',
  imgText: 'main image description',
  // linkText: 'Continue reading…',
};



export default function Blog() {
  const classes = useStyles();

const endpoint ="https://api.nomics.com/v1/currencies/ticker?key=3a1a095e6cc61206a5db21770bfec693&status=active&sort=rank&per-page=100&perpage=1";
const [crypto, setcrypto] = useState([]);
const [reloadtoggle, setreloadtoggle] = useState(false);
const [isLoaded, setIsLoaded] = useState(false)

useEffect(() => {
    fetch(endpoint).then((res) => {
        return res.json();
    }).then((crypto) => {
        const loadedJson = crypto;
        setcrypto(loadedJson);
        setIsLoaded(true);
    })
},[reloadtoggle])


const refreshCryptoPage = (event, cryptoset) => {


  if(event !== "")
  {

    const filteredCrypto = cryptoset.filter((crypto) => {

              return crypto.name.toUpperCase().includes(event.toUpperCase());


        })


      setcrypto(filteredCrypto);


  }


  else {

    setreloadtoggle(!reloadtoggle);
  }


}


const fetchAPINextPage =  (section, isloaded) => {
  
  setIsLoaded(!isloaded);
    fetch(section.api).then((res) => {
      return res.json();
      }).then((crypto) => {
          
      
        const loadedcrypto = crypto.filter((crypto,index) => index >= section.indexStart-1 && index <= section.indexEnd-1);
      
        setcrypto(loadedcrypto);
        setIsLoaded(!isloaded);
      });


  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='false'>
      <HeroBannerContent post={heroBannerContent} />
      </Container>
      <Container maxWidth='lg'>
          <main>
             <Header title="Search your crypto..." sections={sections}  currentcrypto={crypto} isloaded={isLoaded} apinextpage = {fetchAPINextPage} refreshcrypto={refreshCryptoPage} />
              {isLoaded ? <Grid container spacing={4}>
                {crypto.map((crypto) => (
                  <CryptoTicker key={crypto.name} crypto={crypto} />
                ))}
              </Grid> :  <div>Loading...</div> }
              
              <div>
              <Footer title="" description="General crypto information. Free for use. API provided by Nomics"/>
            {/* <Link href="https://nomics.com/docs/">Nomics</Link> */}
              </div>

          </main>
      </Container>
    </React.Fragment>
  );
}
