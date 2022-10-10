import './App.css';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from './Webpages/Homepage/Homepage';
import NotFound from './Webpages/NotFound/NotFound';


function App() {
  return (
    <div className="App container">
    <BrowserRouter>
    <NavigationBar />
    <Switch>
    <Route exact path="/">
          <Homepage />
        </Route>
        <Route>
          <NotFound />
        </Route>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
