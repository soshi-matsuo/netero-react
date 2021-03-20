import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Detail from "./pages/Detail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  )
}

export default App;
