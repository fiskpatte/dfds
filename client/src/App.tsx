import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { DeckMapContainer } from "./modules/deckMap";
import { parseLoadPlan } from "./shared/functions/loadPlanParser";
import loadPlans from "./assets/data/LoadPlans.dat";
import { Header } from "./modules/header";
import { useDispatch } from "react-redux";
import appActions from "./store/actions/appActions";
import { Loader } from "./shared/components/loader";
import { LoginScreen } from "./modules/loginScreen";
import PrivateRoute from "./shared/components/PrivateRoute";
import { getMockCargo } from './api/endpoints';
import EnterCargoScreen from "./modules/enterCargoScreen";
import cargoActions from "./store/actions/cargoActions";
import ConfirmCargoScreen from "./modules/confirmCargoScreen";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    parseLoadPlan(loadPlans).then(res => {
      //TODO: THIS IS ONLY FOR TESTING AND SHOULD BE FIXED LATER
      res["Lower Hold"] = { name: "Lower Hold", lanes: [], grids: [], sortOrder: 1 }
      res["Main Deck"] = { name: "Main Deck", lanes: [], grids: [], sortOrder: 2 }
      res["Upper Deck"] = { name: "Upper Deck", lanes: [], grids: [], sortOrder: 3 }
      dispatch(appActions.setDeckMap(res));
      dispatch(appActions.setCurrentDeck(res["Weather Deck"]));
      getMockCargo().then(cargo => {
        dispatch(cargoActions.setCurrentCargo(cargo));
        setLoading(false);
      })
    });
  }, [dispatch]);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <Router>
      <div className="App">
        <Route component={Header} />
        <Switch>
          <Route path="/" exact>
            <div>TEST</div>
          </Route>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>
          <Switch>
            <PrivateRoute exact path="/placecargo">
              <EnterCargoScreen />
            </PrivateRoute>
            <PrivateRoute exact path="/placecargo/confirmcargo">
              <ConfirmCargoScreen />
            </PrivateRoute>
            <Route exact path="/placecargo/deckmap">
              <DeckMapContainer />
            </Route>
          </Switch>
          <Route path="/discharge">
            <div>Discharge</div>
          </Route>
          <Route path="/history">
            <div>History</div>
          </Route>
          <Route path="/settings">
            <div>Settings</div>
          </Route>
          <Route path="/logout">
            <div>Logout</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
