import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";
import Account from "./pages/account";
import Home from "./pages/Home/home";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Switch>
    </Router>
  );
}

export default App;
