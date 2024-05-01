import React from 'react'
import Middle from '../middle/Middle';
import Left from '../left/Left';
import Right from '../right/Right';
import Header from '../header/Header';
import "./MealPlanPage.css";
export default function MealPlanPage ({ authenticated, onLogout }) {
  return (
    <div>
        <Header authenticated={authenticated} onLogout={onLogout} />
    <main>
       <div className='container'>
          <Left />
          <Middle />
          
       </div>
    </main>
    </div>
    
  )
}
