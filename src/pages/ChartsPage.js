import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import baseEndPoint from "../apis/coinGecko";
import PriceChart from "../components/PriceChart";
import VolumeChart from "../components/VolumeChart";

const ChartsPage = ({match}) => {
  const { id } = useParams();
  const [prices, SetPrices ] = useState({})
  const [volumes, SetVolumes ] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [priceTimePeriod, setPriceTimePeriod] = useState('dailyPrices');
  const [volumeTimePeriod, setVolumeTimePeriod] = useState('dailyVolumes');
  
  useEffect(() => { 
    const fetchData = async () => {

      const [day, week, year] = await Promise.all([
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          }
        }),
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          }
        }),
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          }
        }),

      ])
      SetPrices({
        dailyPrices: day.data.prices,
        weeklyPrices: week.data.prices,
        yearlyPrices: year.data.prices,
      });
      SetVolumes({
        dailyVolumes: day.data.total_volumes,
        weeklyVolumes: week.data.total_volumes,
        yearlyVolumes: year.data.total_volumes,
      });
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  return (
    <>
    {
      isLoading ? <h1>Loading ...</h1> : (
        <div>
          <PriceChart prices={prices} id={id} timePeriod={priceTimePeriod} handleButtonClick={setPriceTimePeriod} />
          <VolumeChart volumes={volumes} id={id} timePeriod={volumeTimePeriod} handleButtonClick={setVolumeTimePeriod} />
        </div>
      )
    }
    </>
      );
    };
export default ChartsPage;
