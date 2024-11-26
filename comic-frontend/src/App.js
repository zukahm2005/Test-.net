import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import ComicBooks from "./page/ComicBooks";
import Rentals from "./page/Rentals";
import Customers from "./page/Customers";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/comics">Comic Books</a></li>
            <li><a href="/customers">Customers</a></li>
            <li><a href="/rentals">Rentals</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<ComicBooks />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
