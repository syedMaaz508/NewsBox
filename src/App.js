import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=> {

  const [progress, setProgress] = useState(0);

    return (
      <div>
        {/* below code syntax taken from react router dom official website  */}
         <Router>
        <Navbar/>

        <LoadingBar
        color='#f11946'
        progress={progress}
        
        />

        <Switch>

          <Route exact path="/">
            <News loadingProgress={setProgress} key="general" pageSize={6} category='general' country='in'/>
          </Route>
          <Route exact path="/general">
            <News loadingProgress={setProgress} key="general" pageSize={6} category='general' country='in'/>
          </Route>
          <Route exact path="/business">
            <News loadingProgress={setProgress} key="business" pageSize={6} category='business' country='in'/>
          </Route>
          <Route exact path="/sports">
            <News loadingProgress={setProgress} key="sports" pageSize={6} category='sports' country='in'/>
          </Route>
          <Route exact path="/entertainment">
            <News loadingProgress={setProgress} key="entertainment" pageSize={6} category='entertainment' country='in'/>
          </Route>
          <Route exact path="/health">
            <News loadingProgress={setProgress} key="health" pageSize={6} category='health' country='in'/>
          </Route>
          <Route exact path="/science">
            <News loadingProgress={setProgress} key="science" pageSize={6} category='science' country='in'/>
          </Route>
          <Route exact path="/technology">
            <News loadingProgress={setProgress} key="technology" pageSize={6} category='technology' country='in'/>
          </Route>

        </Switch>

        </Router>
      </div>
    )
  
}
export default App;
