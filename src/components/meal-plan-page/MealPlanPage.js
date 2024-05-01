import React from 'react'
import Left from '../left/Left';
import Right from '../right/Right';
import Header from '../header/Header';
import "./MealPlanPage.css";
import MiddleMealPlan from '../middlemealplan/MiddleMealPlan';
export default function MealPlanPage ({ authenticated, onLogout }) {
  return (
    <div>
        <Header authenticated={authenticated} onLogout={onLogout} />
    <main>
       <div className='container'>
          <Left />
          <MiddleMealPlan />
          
       </div>
    </main>
    </div>
    
  )
}
