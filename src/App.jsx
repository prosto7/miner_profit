
import './App.css';
import Menu from './Menu/Menu';
import { useState } from 'react';
import Miner from "./components/Miner/ControlMiner";
import EditableTable from "./components/Table/EditableTable"

function App() {
  const columns = [
    { field: 'id', fieldName: '#' },
    { field: 'model', fieldName: 'Модель майнера' },
    { field: 'terahash', fieldName: 'Производительность t/h' },
    { field: 'kwt', fieldName: 'Потребление' },
    // { field: 'btcDay', fieldName: 'btc/day' },
    // { field: 'incomeDay', fieldName: 'Доход в день' },
    // { field: 'incomeMonth', fieldName: 'Доход в месяц' },
    // { field: 'energyCost', fieldName: 'Затраты на энергию' },
    { field: 'price_kwt', fieldName: 'Цена за квт (руб.)' },
    { field: 'profit', fieldName: 'Прибыль' },
    { field: 'amount', fieldName: 'Количество майнеров' },
    { field: 'sum', fieldName: 'Итог' },
    // { field: 'price_asic', fieldName: 'Цена майнера (руб.)' },
    

  ];

  const data = [
    { id: 1, model: 'Asic_S9j', terahash: '10.2', kwt: '0.939', price_kwt: '4', price_asic: '15000' },
    { id: 2, model: 'Dual_S9j', terahash: '19.8', kwt: '1.59', price_kwt: '4', price_asic: '30000', },
  ];
 
 

  const [menuActive, setMenuActive] = useState(false);



  const items = [{value: "Главная", href: '/main', icon: "api", component: <Miner/>},
  {value: "Second", href: '/table', icon: "api",  component:  <EditableTable columns={columns} rows={data} actions />},
  {value: "Third", href: '/shop', icon: "api",  component: <Miner/>}

]

  return (
    <div className="App">
        <nav>
          <div className="burger-btn" onClick={()=> setMenuActive(!menuActive)}>
            <span className={menuActive ? 'span active' : ''}></span>
          </div>
        </nav>
        <main>
         
        </main>
        {/* активация бургер меню  */}
        {/* <Menu active={menuActive} setActive={setMenuActive} header={'Asic Profit'} items={items}/> */}
      <Miner/>
  
    </div>
  );
}

export default App;
