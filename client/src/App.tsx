import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import DeckMapContainer from "./modules/deckMap/DeckMap.container";
import { parseLoadPlan } from "./shared/functions/loadPlanParser";
import loadPlans from "./assets/data/LoadPlans.dat";
import Header from "./modules/header/Header";
import { useDispatch } from "react-redux";
import appActions from "./store/actions/appActions";
import Loader from "./shared/components/loader/Loader";
import LoginScreen from "./modules/loginScreen/LoginScreen";
import PrivateRoute from "./shared/components/PrivateRoute";
import { getMockCargo } from './api/endpoints';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    parseLoadPlan(loadPlans).then(res => {
      //TODO: THIS IS ONLY FOR TESTING AND SHOULD BE FIXED LATER
      res.unshift({ deck: "Lower Hold", lanes: [], grids: [] },
        { deck: "Main Deck", lanes: [], grids: [] },
        { deck: "Upper Deck", lanes: [], grids: [] })
      dispatch(appActions.setDeckMap(res));
      dispatch(appActions.setCurrentDeck(res[3]));
      getMockCargo().then(res => {
        dispatch(appActions.setCurrentCargo(res));
        setLoading(false);
      })
    });
  });

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
          <Route path="/loading">
            <DeckMapContainer />
          </Route>
          <PrivateRoute path="/overview">
            <h1>Protected overview</h1>
          </PrivateRoute>
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
