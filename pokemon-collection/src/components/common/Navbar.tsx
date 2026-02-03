import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <div>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/directory">Directory</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
