import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <main className="">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="/movies" />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
