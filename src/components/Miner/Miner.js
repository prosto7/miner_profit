import React from 'react';

import {ASIC_LIST} from './MinerList';

const Miner = ({id,price,model,terahash, watt,price_kwt}) => {

const type = ASIC_LIST.Asics;
console.log(type);

let btcDay = (0.000005 * Number(terahash)).toFixed(6);
let incomeDay = (btcDay * price).toFixed(2);
let incomeMonth = (incomeDay * 30).toFixed(2);
let energyCost = (watt * price_kwt * 720).toFixed(2);
let profit = (incomeMonth - energyCost).toFixed(2);
let amount = 1;
let sum = profit * amount ;


    return (
        <tr>
        <td className='model'>{model}</td>
        <td>{terahash}</td>
        <td>{watt}</td>
        <td className='btc_day'>{btcDay}</td>
        <td className='btc_price'>{price}</td>
        <td className='income_day'>{incomeDay}</td>
        <td className='income_month'>{incomeMonth}</td>
        <td className='price_kwt'>{price_kwt}</td>
        <td>{energyCost}</td>
        <td className='profit'>{profit}</td>
        <td className='amount'>{amount}</td>
        <td className='sum' >{sum}</td>
 
    </tr>
        
        // <div className="col-sm planet-container">
        //     <div className="row planet-row">
        //         <div className="planet">
        //             <h1>{name}</h1>
        //             <a className="planet-url"href={url} target='_blank'>{url}</a>

        //                 {img}
        // </div>
        //         <br />
        //         <div className="planet-data">
        //             <table>
        //             <tr>
        //             <td>Климат:  </td> 
        //             <td>{climate}</td>
        //             </tr>
        //             <tr>
        //             <td>Местность: </td>
        //             <td>{terrain}</td>
        //             </tr>
        //             <tr>
        //             <td>Вода:  </td>
        //             <td>{surface_water}</td>
        //             </tr>
        //             <tr>
        //             <td>Гравитация:  </td>
        //             <td> {gravity}</td>
        //             </tr>
        //             <tr>
        //             <td>Население:  </td>  <td> {population}</td>
        //             </tr>
        //             </table>
        //             <br />
        //         </div>
             
        //     </div>
        //     <br />
        // </div>
    )
}

export default Miner;

//git
