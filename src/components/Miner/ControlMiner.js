import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Miner from './Miner';
import {ASIC_LIST} from './MinerList';
import './Miner.css';




function ControlMiner() {
const [btcRate, SetbtcRate] = useState([]);
const newList ={ASIC_LIST}; 
const hello = newList.ASIC_LIST.Asics;



    const reqA = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=rub&order=market_cap_desc&per_page=1&page=1&sparkline=false';

    useEffect(()=>{
        axios.get(reqA)
        .then(res => {
            SetbtcRate(res.data[0].current_price); //получаем данные о монетах
            
        }).catch(error => alert('Api error'))
    }, []);
  
  return (
    <div className='container container-table-padding-media'>
   <table className="table table-light table-bordered table-sm">
        <caption>Таблица доходности майнеров</caption>
        <thead className ='thead-light'>
            <tr>
                <th >Model</th>
                <th >Hash</th>
                <th>watt</th>
                <th className="btc_day">btc/day</th>
                <th>price btc</th>
                <th className="income_day">income/day</th>
                <th className="income_month">income/month</th>
                <th className='price_kwt'>price/ kwt</th>
                <th>energy costs</th>
                <th className="profit">profit</th>
                <th className='amount'>amount</th> 
                <th>Sum</th>
             
            
            </tr>
            </thead>
            <tbody>
            {hello.map(newLister=> {
                return (
            <Miner key={newLister.id} model={newLister.model} price={btcRate} terahash={newLister.terahash}
            watt={newLister.kwt} price_kwt={newLister.price_kwt} amount={newLister.amount}>


            </Miner>
            )
           
        })
    }   
          
          </tbody>
    </table>
         </div>
  
    )
}


export default ControlMiner;



