import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'wouter';

import { Home } from './views/Home';
import { SignIn } from './views/Login';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/withdraw" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
