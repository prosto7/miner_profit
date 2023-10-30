import './App.css';
import { useState } from 'react';
import Miner from "./components/Miner/ControlMiner";
import Calculator from './components/Calc/Calc';




function App() {
  
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="App">
        <nav>
          <div className="burger-btn" onClick={()=> setMenuActive(!menuActive)}>
            <span className={menuActive ? 'span active' : ''}></span>
          </div>
        </nav>
        <main>
        <Calculator />
        </main>
        
        {/* активация бургер меню  */}
        {/* <Menu active={menuActive} setActive={setMenuActive} header={'Asic Profit'} items={items}/> */}

  
    </div>
  );
}

export default App;
