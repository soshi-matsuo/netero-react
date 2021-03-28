import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="/" component={Index} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
