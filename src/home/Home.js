import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Search from './Search';
import HeroBannerContent from './HeroBannerContent';
import CryptoTicker from './Cryptoticker';
import Footer from './Footer';



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



export default function Home() {

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

              return crypto.name.toUpperCase().includes(event.toUpperCase()) || crypto.symbol.toUpperCase().includes(event.toUpperCase()) || crypto.rank.includes(event)  ;


        })


      setcrypto(filteredCrypto);


  }


  else {

    setreloadtoggle(!reloadtoggle);
  }


}


const fetchAPINextPage = async (section, isloaded) => {
  
  setIsLoaded(!isloaded);
   const result = await fetch(section.api).then((res) => {
      return res.json();
      }).then((crypto) => {
          
      
        const loadedcrypto = crypto.filter((crypto,index) => index >= section.indexStart-1 && index <= section.indexEnd-1);
      
        setcrypto(loadedcrypto);
        return true;
      });


     setIsLoaded(result);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='false'>
      <HeroBannerContent post={heroBannerContent} />
      </Container>
      <Container maxWidth='lg'>
          <main>
             <Search title="Search crypto ticket, name or rank by marketcap" sections={sections}  currentcrypto={crypto} isloaded={isLoaded} apinextpage = {fetchAPINextPage} refreshcrypto={refreshCryptoPage} />
              {isLoaded && crypto.length > 0 ? <Grid container spacing={4}> { 
                  crypto.map((crypto) => (
                  <CryptoTicker key={crypto.name} crypto={crypto} />
                ))  } </Grid> : crypto.length === 0 ?  <div>No Crypto Results</div>  : <div>Loading...</div> }
              
              <div>
              <Footer title="" description="Crypto Market Cap & Pricing Data Provided By Nomics"/>
              </div>

          </main>
      </Container>
    </React.Fragment>
  );
}
