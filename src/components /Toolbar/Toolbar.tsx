import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/pages/home" className="navbar-brand">
          Static Pages
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/pages/home" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="pages/about" className="nav-link">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="pages/contacts" className="nav-link">
              Contacts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="pages/division" className="nav-link">
              Divisions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;