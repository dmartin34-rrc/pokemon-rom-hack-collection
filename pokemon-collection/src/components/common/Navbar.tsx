import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <div>
        <NavLink to="/" end>
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
