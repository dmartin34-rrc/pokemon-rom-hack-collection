import { NavLink } from 'react-router';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const pseudoClass = ({ isActive }: { isActive: boolean }): string =>
    `px-2 py-2 font-medium text-xl cursor-pointer border-b-2 ${
      isActive
        ? 'text-slate-900 border-slate-500'
        : 'text-slate-600 border-transparent hover:text-slate-700 hover:border-slate-200 active:border-red-300'
    }`;

  return (
    <nav>
      <div className="flex gap-1 px-4 py-2">

        {/* Main Nav Items */}
        <NavLink to="/" end className={pseudoClass}>
          Home
        </NavLink>

        <NavLink to="/directory" className={pseudoClass}>
          Directory
        </NavLink>

        <NavLink to="/tracker" className={pseudoClass}>
          Tracker
        </NavLink>
        
        {/* Show when SIGNED IN */}
        <SignedIn>
          <NavLink to="/favorites" end className={pseudoClass}>
            Favorites
          </NavLink>
        </SignedIn>

        {/* NOTE: this component is only visible when the user is not signed in and comes from clerk */}
        <div className="ml-auto flex items-center">
          <SignedOut>
            <NavLink to="/login" className={pseudoClass}>
              Login
            </NavLink>
          </SignedOut>
        </div>

        <SignedIn>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>

      </div>
    </nav>
  );
};

export default Navbar;
