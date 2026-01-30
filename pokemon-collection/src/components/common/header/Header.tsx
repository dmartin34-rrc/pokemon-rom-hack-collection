import "./Header.css";
import { NavLink } from "react-router-dom";

import dean from "../../../../public/dean_github.png";
import zach from "../../../../public/zach_github.png";
import efe from "../../../../public/efe_github.png";

function Header(): JSX.Element {
  return (
    <header className="header">
      <h1 className="title">Pokemon ROM Hack Collection</h1>

      {}
      <nav aria-label="Primary navigation" className="app-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/page-two">Page Two</NavLink>
      </nav>

      <ul className="github-profiles">
        <li>
          <a
            href="https://github.com/dmartin34-rrc"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={dean}
              alt="Dean GitHub profile"
              title="Dean GitHub profile"
              id="dean"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/zachary-lam"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={zach}
              alt="Zachary Lam GitHub profile"
              title="Zachary Lam GitHub profile"
              id="zach"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/EfeOnota"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={efe}
              alt="Efe Onota GitHub profile"
              title="Efe Onota GitHub profile"
              id="efe"
            />
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
