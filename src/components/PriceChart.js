import React from 'react';
import {Line} from "react-chartjs-2";
import {Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

Chart.register(...registerables);



const PriceChart = ({ prices: {dailyPrices, weeklyPrices, yearlyPrices}, id, timePeriod,  handleButtonClick }) => {
  // eslint-disable-next-line no-unused-vars
  const transformData = (data) => {
    return data.map(item => ({
      x: new Date(item[0]),
      y: item[1]
    }));
  };

 const dataToDisplay = {
  'dailyPrices': dailyPrices,
  'weeklyPrices': weeklyPrices,
  'yearlyPrices': yearlyPrices,
 }[timePeriod];

  if (!dataToDisplay){
    return <div>No data Avalilable for {timePeriod}</div>;
  }

  return (
    
      <div>
       <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4} sm={4} md={4}>
        <Button variant="outlined" color="info" onClick={() => handleButtonClick('dailyPrices')} style={{marginBottom: '22px', marginLeft:'12px'}}>
          24Hour
        </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
        <Button variant="outlined" color="info" onClick={() => handleButtonClick('weeklyPrices')} style={{marginBottom: '22px',marginLeft:'12px'}}>
          1Week
        </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
        <Button variant="outlined" color="info" onClick={() => handleButtonClick('yearlyPrices')} style={{marginBottom: '22px',marginLeft:'12px'}}>
          1Year
        </Button>
        </Grid>
        </Grid>

         <Line data = {{
          labels: [],
          datasets: [{
            labels: `${id} ${timePeriod}`,
            data: transformData(dataToDisplay),
          }]
        }}
          
        options={{
          scales: {
            x: {
              type: 'time',
            },
          },
        }}
        /> 
      </div>
  );
};

export default PriceChart;
