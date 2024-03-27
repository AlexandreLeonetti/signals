   /* <div className="mt-10 px-4 grid grid-cols-4 gap-4">
            {lastPrice && lastPrice.map((obj, index) => (
                        <Card key={index} data={obj.prices[0].symbol} lastPrice={obj.prices[0].price} />
            ))}
    </div>*/


import React, { useState, useEffect } from 'react';
import FearGreed from "./FearGreed";
import Card from "./Card";
//import './Monitoring.css';
function getCoins ( A ){
    let coins = [];
    A.map(a=> coins.push(a.symbol))
    return coins; 
}

function getPriceForSymbol(symbol, data) {
        for (const obj of data) {
                    if (obj.symbol === symbol) {
                                    return obj.price;
                                }
                }
        return null;
}

function getPrices(coins, A){
    let prices = [];
    coins.forEach((coin)=>{
        let price = getPriceForSymbol(coin, A[0].prices);
        prices.push(Number.parseFloat(price));
    });
    return prices;
}

function getAvg (coins, A){
    let coinAvg = [];
    console.log(coins);
    coins.forEach((coin) => {
        let sum = 0;
        let len = A.length;
      A.forEach(a=>{
        let x = (getPriceForSymbol(coin,a.prices));
            sum += Number.parseFloat(x);
        });
        let avg = sum/len;
                console.log(avg);
        coinAvg.push(avg);
    });
    return coinAvg;
}

function getAvg20 (coins, A){
    A = A.slice(0,20)
    let coinAvg = [];
    console.log(coins);
    coins.forEach((coin) => {
        let sum = 0;
        let len = A.length;
      A.forEach(a=>{
        let x = (getPriceForSymbol(coin,a.prices));
            sum += Number.parseFloat(x);
        });
        let avg = sum/len;
                console.log(avg);
        coinAvg.push(avg);
    });
    return coinAvg;
}


function buildObject(keys, values) {
        const obj = {};
        for (let i = 0; i < keys.length; i++) {
                    obj[keys[i]] = values[i];
                }
        return obj;
}

function fuse (obj1, obj2, obj3){

    const result = [];

    for (const key in obj1) {
            if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) ) {
                        result.push({
                                        name: key,
                                        price: obj1[key],
                                        average20: obj2[key],
                                        average: obj3[key]
                                    });
                    }
    }
    return result;
}

const Monitoring= () => {
  const [data, setData] = useState(null);
  const  [lastPrice, setLastPrice] =  useState(null);
    const [allVal, setAll] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch('http://16.170.155.76:5000/daysig');
        //const jsonData = await response.json();
        //setData(jsonData);
        //let latest  = await fetch('http://16.170.155.76:5000/history');
        //let latest    = await fetch('https://worldmathranking.com/api/mongo');
        let latest    = await fetch('/api/mongo');
        latest = await latest.json();
          console.log(latest);
        let coins =(getCoins(latest[0].prices));
        let avg = (getAvg(coins, latest));
        let avg20 = getAvg20(coins,latest);
        let prices = getPrices(coins, latest);
          let averagesObj = (buildObject(coins,  avg));
          let averagesObj20 = (buildObject(coins, avg));
          let pricesObj = (buildObject(coins,prices));
          let all = fuse (  pricesObj , averagesObj20 , averagesObj );
          
          console.log(all);

        let testArr = latest;
        //setLastPrice(testArr);
        setAll(all);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
<>

            <FearGreed/>
<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {allVal&& allVal.map((obj, index) => (
                 <Card key={index} 
                    data={obj.name} 
                    lastPrice={obj.price} 
                    avgTen = {obj.average20} 
                    avg20  = {obj.average }
                />
            ))}
    </div>
      </>

  );
};

export default Monitoring;
