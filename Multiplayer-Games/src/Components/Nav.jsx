import { Link } from 'react-router-dom';
import "./Nav.css"

function Nav() {
  return (
    <nav>
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul>
        <li><Link to="/"> Home</Link></li>
        <li className="dropdown">
        <button className="dropbtn">Categories</button>
        <div className="dropdown-content">
          <p>Action</p>
          <p>Adventure</p>
          <p>Puzzle</p>
          <p>Shooting</p>
        </div>
      </li>
        <li><Link to="/friends">Friends</Link></li>
      </ul>
      
      
      
      <div className="actions">
      <span className="search-area">
        <input type="text" placeholder="Search" />
      </span>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Nav;
