import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProjectDetailsScreen from "./pages/ProjectDetailsScreen";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/project/:id" component={ProjectDetailsScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
