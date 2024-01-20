import React, { useState } from 'react';
import PriceChart from './PriceChart';
import VolumeChart from './VolumeChart';

const ParentComponent = ({ prices, volumes, id }) => {
  const [timePeriod, setTimePeriod] = useState('dailyPrices');

  const handleButtonClick = (period) => {
    setTimePeriod(period);
  };

  return (
    <div>
      <PriceChart prices={prices} id={id} timePeriod={timePeriod} handleButtonClick={handleButtonClick} />
      <VolumeChart volumes={volumes} id={id} timePeriod={timePeriod} handleButtonClick={handleButtonClick} />
    </div>
  );
};

export default ParentComponent;