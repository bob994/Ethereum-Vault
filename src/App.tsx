import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'wouter';

import { Home } from './routes/Home';
import { SignIn } from './routes/Login';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
