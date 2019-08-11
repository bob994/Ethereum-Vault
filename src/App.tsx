import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'wouter';
import { toast } from 'react-toastify';

import { Home } from './views/Home';
import { SignIn } from './views/Login';

toast.configure({
  autoClose: 5000,
  pauseOnHover: false,
});

const App: FunctionComponent = () => {
  return (
    <div className="app container-fluid">
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/withdraw" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
