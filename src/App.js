// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import MemoDetailsScreen from './components/MemoDetailsScreen';
import CreateNewMemoScreen from './components/CreateNewMemoScreen';
import DynamicHomeScreen from './components/DynamicHomeScreen'; // Assuming you create this component
import SettingsScreen from './components/SettingsScreen'; // Optional

function App() {
  return (
    <Router>
      <Switch>
        {/* Home Screen Route */}
        <Route exact path="/">
          <HomeScreen />
        </Route>

        {/* Memo Details Screen Route */}
        <Route path="/memo/:memoId">
          <MemoDetailsScreen />
        </Route>

        {/* Create New Memo Screen Route */}
        <Route path="/create">
          <CreateNewMemoScreen />
        </Route>

        {/* Dynamic Home Screen (Post-Editing) Route */}
        <Route path="/dynamic-home">
          <DynamicHomeScreen />
        </Route>

        {/* Optional Setting Screen Route */}
        <Route path="/settings">
          <SettingsScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
