import "./footer.css";

const Footer: React.FC = () => {
  const members: string[] = ["Zachary Lam", "Efe Onota", "Dean Martin"];
  const year: number = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__container">
        <div className="footer__top">

          <nav className="footer__nav" aria-label="Footer navigation">
            <ul className="footer__links">
              <li>
                <a className="footer__link" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  Site Terms
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__disclaimer">
            © {year} Pokemon ROM Hack Collection. Not affiliated with Nintendo,
            Game Freak, or The Pokémon Company. This project is for educational
            purposes only.
          </p>

          <p className="footer__team">
            Project Team: {members.join(" • ")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
