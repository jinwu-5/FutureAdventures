import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Post from "./pages/Post/Post";
import { StoreProvider } from "./store/store";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/post" component={Post} />
        </Container>
      </Router>
    </StoreProvider>
  );
}

export default App;
