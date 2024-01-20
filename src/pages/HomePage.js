import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import baseEndPoint from "../apis/coinGecko";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectCrypto } from '../features/CryptoSlice';
import BarChartIcon from '@mui/icons-material/BarChart';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import accounting from 'accounting';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const theme = createTheme();
  
const HeaderCell = styled(TableCell)({
 fontWeight: 800,
 fontSize: "16px",
 fontStyle: "italic"
})
const HomePage = () => {
  const crypto = useSelector(selectCrypto);
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await  baseEndPoint.get("/coins/markets", {
          params: {
            vs_currency: "usd",
            order: 'market_cap_desc',
            per_page: 200,
            page: 1,
            sparkline: false,
            // ids: crypto.map(coin => coin.id).join(","),
          },
        })
        setCoins(response.data)
        setIsLoading(false)
        console.log("coins =>", coins)

      }catch(err){console.log(err)}
  
      }
    fetchData() 
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [crypto]) 


   const handleDelete = (id) => {
    setCoins(coins.filter(coin => coin.id !== id));
   }
  return (
    <ThemeProvider  theme={theme}>
      {isLoading ? <p>Loading...</p> : (
<>
    <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <HeaderCell align="center" style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}}>Image</HeaderCell>
            <HeaderCell align="center"style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}} >Symbol</HeaderCell>
            <HeaderCell align="center"style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}} >MktCap-Rank</HeaderCell>
            <HeaderCell align="center" style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}} >Charts</HeaderCell>
            <HeaderCell align="center"style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}} >Price-1-day-2</HeaderCell>
            <HeaderCell align="center" style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}}>Price-24-hrs</HeaderCell>
            <HeaderCell align="center" style={{backgroundColor:'#4a4a4a', color: 'whitesmoke',border:'1px solid black',fontFamily:'Arial'}}>Delete</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
           coins.map((coin) => (
          <TableRow key={coin.id}data={coin} style={{backgroundColor: coin % 2 === 0 ? '#00ff7f': 'white'}}>
            <TableCell align="center"><img src={coin.image} alt={coin.name} style={{width: '20px'}} /></TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>{coin.symbol.toUpperCase()}</TableCell>
            <TableCell  align="center" style={{color:'darkgreen', fontWeight:'bold'}}>{coin.market_cap_rank}</TableCell>
            <TableCell  align="center">
              <Link to={ `/cryptocurrency/${coin.id}`} style={{color: "blue"}}>
              <BarChartIcon/>
              </Link>
              </TableCell>
            <TableCell align="center" style={{color:'green', fontWeight: 'bold'}}>{accounting.formatMoney(coin.current_price, "$")}</TableCell>
            <TableCell align="center" style={{color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'}}>
            {coin.price_change_percentage_24h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            {coin.price_change_percentage_24h.toFixed(2)}%
            </TableCell>
            <TableCell align="center">
              < DeleteIcon  style={{color: 'red'}} onClick={() => handleDelete(coin.id)} />
            </TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
    </TableContainer>
    </>
      )}
    </ThemeProvider>
  );
};

export default HomePage;
