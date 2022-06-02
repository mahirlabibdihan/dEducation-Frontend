import React from "react";
import "./sidebar.scss";
function Sidebar() {
  return (
    <div class="sidebar-container">
      <a href="/" class="w3-bar-item w3-button">
        Home
      </a>
      <a href="/" class="w3-bar-item w3-button">
        Request Tutor
      </a>
      <a href="/" class="w3-bar-item w3-button">
        Search Tutor
      </a>
      <a href="/" class="w3-bar-item w3-button">
        Search Coaching
      </a>
      <a href="/" class="w3-bar-item w3-button">
        My tutors
      </a>
      <a href="/" class="w3-bar-item w3-button">
        My coachings
      </a>
      <a href="/" class="w3-bar-item w3-button">
        Profile
      </a>
      <a href="/" class="w3-bar-item w3-button">
        Log Out
      </a>
    </div>
  );
}

export default Sidebar;
