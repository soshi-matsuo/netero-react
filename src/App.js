import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./context/accessToken"

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/detail/:id" exact render={({location}) => <Detail location={location} checkAuthentication={isAuthenticated} />} />
          <Route path="/" render={() => {
            const fragment = location.hash;
            const accessToken = fragment.match(/#access_token=(.+?)&/)?.[1];
            if (accessToken) document.cookie = `accessToken=${accessToken}`;
            return <Index checkAuthentication={isAuthenticated} />}
          } />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
