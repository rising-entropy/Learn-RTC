import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="App">
      <br />
      <h3>ChatPort</h3>
      <p>Personal and Group Chat - Simplest Implementation</p>
      <br />
      <Link to={"/login"}>
        <button className="btn btn-lg btn-dark">Login</button>
      </Link>
      <br /><br />
      <Link to={"/register"}>
        <button className="btn btn-lg btn-dark">Sign Up</button>
      </Link>
    </div>
  )
}
