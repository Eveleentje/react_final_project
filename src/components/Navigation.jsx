import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
        <li>
          <Link to="/event/new">Add Event +</Link>
        </li>
      </ul>
    </nav>
  );
};
