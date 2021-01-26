import "./App.css";
import HomePage from "./components/homePage/HomePage";
import { Provider } from "react-redux";
import { store } from "./helpers/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OneBook from "./components/oneBook/OneBook";
import Form from "./components/form/Form";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/basket">
            <OneBook />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
