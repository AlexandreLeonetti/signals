   /* <div className="mt-10 px-4 grid grid-cols-4 gap-4">
            {lastPrice && lastPrice.map((obj, index) => (
                        <Card key={index} data={obj.prices[0].symbol} lastPrice={obj.prices[0].price} />
            ))}
    </div>*/


import React, { useState, useEffect } from 'react';
import FearGreed from "./FearGreed";
import Card from "./Card";
import Top from "./Top";

function calculateFear(bitcoin){
    let fng = 0;
    

    void(bitcoin.averageOfTen>0 && (fng++));
    void(bitcoin.averageOf20>0 && (fng++));
    void(bitcoin.averageOf50>0 && (fng++));
    void(bitcoin.averageOf100>0 && (fng++));

    fng = fng*24;
    return fng;
}
function getFngText(fng){
    if (fng> 55) return "Greed";
    if (fng< 45) return "Fear";
    return "Neutral";
}
function calculateAverages(inputModel) {
    // Step 1: Collect all prices for each symbol
    const symbolPrices = {};
    inputModel.forEach(item => {
        item.prices.forEach(price => {
            if (!symbolPrices[price.symbol]) {
                symbolPrices[price.symbol] = [];
            }
            symbolPrices[price.symbol].push(parseFloat(price.price));
        });
    });

    // Step 2: Calculate averages
    const output = [];
    for (const symbol in symbolPrices) {
        const prices = symbolPrices[symbol];
        const averageOf10= prices.slice(0,10).reduce((sum, price) => sum + price, 0) / 10;
        const averageOf20 = prices.slice(0,20).reduce((sum, price) => sum + price, 0) / 20;
        const averageOf50 = prices.slice(0,50).reduce((sum, price) => sum + price, 0) / 50;
        const averageOf100 = prices.slice(0,100).reduce((sum, price) => sum + price, 0) / 100;

        const deviation10 = ((prices[0]/averageOf10 -1)*100).toFixed(3) ;
        const deviation20 = ((prices[0]/averageOf20 -1)*100).toFixed(3) ;
        const deviation50 = ((prices[0]/averageOf50 -1)*100).toFixed(3) ;
        const deviation100 = ((prices[0]/averageOf100 -1)*100).toFixed(3) ;
        // Step 3: Construct the output array
        output.push({
            symbol: symbol,
            price: prices[0].toString(), // Use the last price as the current price
            averageOfTen: deviation10,
            averageOf20: deviation20,
            averageOf50: deviation50,
            averageOf100:deviation100
        });
    }

    return output;
}





const Monitoring= () => {
  const [data, setData] = useState(null);
  const [lastPrice, setLastPrice] =  useState(null);
  const [allVal, setAll] = useState(null);
  const [fng, setFng] = useState(0);
  const [text, setText]= useState("");

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
        let all = calculateAverages(latest);
        //console.log("all");
        //console.log(all[0]);//all[0]
        let fear = calculateFear(all[0]);
        setFng(fear);
        setAll(all);
        setText(getFngText(fear));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
<div className = "">
            {allVal && (<Top
                fng = {fng}
                text = {text}
                ranking = {allVal}
            /> ) }
            <div className="mx-auto max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {allVal&& allVal.map((obj, index) => (
                 <Card key={index} 
                    data={obj.symbol} 
                    lastPrice={obj.price} 
                    avgTen = {obj.averageOfTen} 
                    avg20  = {obj.averageOf20 }
                    avg50  = {obj.averageOf50 }
                    avg100 = {obj.averageOf100}
                />
            ))}
    </div>
      </div>

  );
};

export default Monitoring;
