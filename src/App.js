import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";

const isAuthenticated = () => document.cookie.match(/accessToken=(.+?)(;|$)/)?.[1];

const App = () => {
  return (
    <div>
      <Navbar />
      {isAuthenticated() ?
        <Router>
          <Switch>
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/" component={Index} />
          </Switch>
        </Router>
        : <p>Not Authenticated Yet</p>
      }
    </div>
  )
}

export default App;
