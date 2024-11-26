import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Comic Rental System</h1>
      <nav>
        <ul>
          <li><Link to="/comics">Manage Comics</Link></li>
          <li><Link to="/customers">Manage Customers</Link></li>
          <li><Link to="/rentals">Manage Rentals</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
