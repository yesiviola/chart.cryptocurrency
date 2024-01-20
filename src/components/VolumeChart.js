import React from 'react';
import {Line} from "react-chartjs-2";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';




const VolumeChart = ({ volumes: {dailyVolumes, weeklyVolumes, yearlyVolumes}, id, timePeriod, handleButtonClick}) => {
  const transformData = (data) => {
    return data.map(item => ({
      x: new Date(item[0]),
      y: item[1]
    }));
  };

  const dataToDisplay = {
    'dailyVolumes': dailyVolumes,
    'weeklyVolumes': weeklyVolumes,
    'yearlyVolumes': yearlyVolumes,
  }[timePeriod];

  if (!dataToDisplay){
    return <div>No data Avalilable for {timePeriod}</div>;
  }
  return (
 <div>
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={4} sm={4} md={4}>
      <Button variant="outlined" color="info" onClick={() => handleButtonClick('dailyVolumes')} style={{marginBottom: '22px', marginLeft:'12px'}}>
        24Hour
      </Button>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
      <Button variant="outlined" color="info" onClick={() => handleButtonClick('weeklyVolumes')} style={{marginBottom: '22px',marginLeft:'12px'}}>
        1Week
      </Button>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
      <Button variant="outlined" color="info" onClick={() => handleButtonClick('yearlyVolumes')} style={{marginBottom: '22px',marginLeft:'12px'}}>
        1Year
      </Button>
      </Grid>
      </Grid>
  <Line 
   data={{
    labels: [],
    datasets: [
      {
        label: `${id} ${timePeriod}`,
        data: transformData(dataToDisplay),
      },
    ]
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

export default VolumeChart;
