import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import './Menu.css'


const Menu = ({header, items, active, setActive}) => {
    return (
<div className='container main_container'>
        <div className={active ? 'menu active' : 'menu'} onClick={()=> setActive(false)}>
            <div className="blur">
            </div>
                <div className="menu__content" onClick={e => e.stopPropagation()}>
                <div className="menu__header">
                    {header}
                </div>
                <ul>
                {items.map(
                        item => <li>
                            <NavLink to={item.href}>{item.value}</NavLink>
                            <span className="material-icons">{item.icon}</span>
                        </li>
                )}
                {/* //  <li>
                //  <NavLink to='/'>All</NavLink>
                // <NavLink to='/main'>Home</NavLink>
                //         </li> */}
                 
                </ul>
</div>

        </div>

<div className={"content"}>
        
<Routes>
{items.map(
        item => 
         <Route path={item.href}  element={item.component}/>
)}

        </Routes>
        </div></div>
    )
}

export default Menu;