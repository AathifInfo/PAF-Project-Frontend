
import './App.css';

import MainPage from './components/main-page/MainPage';
import SignUp from './components/signup/SignUp2';
import LogIn from './components/login/LogIn2';
import Left from './components/left/Left';
import { BrowserRouter as Router, Routes as Switch,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" element={ <MainPage  />}/>
          <Route path="/sign-up"element={ <SignUp  />}/>
          <Route path="/log-in"  element={<LogIn />} />
          <Route path="/left"  element={<Left />} />

         
         
        </Switch>
       
      </Router>
      
    </div>
  );
}

export default App;
