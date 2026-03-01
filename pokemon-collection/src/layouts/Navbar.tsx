import { NavLink } from 'react-router';

const Navbar = () => {
  const pseudoClass = ({ isActive }: { isActive: boolean }): string =>
    `px-2 py-2 font-medium text-xl cursor-pointer border-b-2 ${
      isActive
        ? 'text-slate-900 border-slate-500'
        : 'text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-200 active:border-red-300'
    }`;

  return (
    <nav>
      <div className="flex gap-1 px-4 py-2">
        <NavLink to="/" end className={pseudoClass}>
          Home
        </NavLink>
        <NavLink to="/favorites" end className={pseudoClass}>
          Favorites
        </NavLink>
        <NavLink to="/directory" className={pseudoClass}>
          Directory
        </NavLink>
        <NavLink to="/tracker" className={pseudoClass}>
          Tracker
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
