import { NavLink } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <ul>
      <li className="nav-item">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-linnk-active' : 'nav-link')}>Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/SavedCandidates" className={({ isActive }) => (isActive ? 'nav-linnk-active' : 'nav-link')}>Potential Candidates</NavLink>
      </li>
    </ul>
  )
};

export default Nav;
