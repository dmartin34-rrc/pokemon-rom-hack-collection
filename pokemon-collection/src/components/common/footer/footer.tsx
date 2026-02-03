const Footer: React.FC = () => {
  const members: string[] = ["Zachary Lam", "Efe Onota", "Dean Martin"];
  const year: number = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] text-[#FAFAF9] border-t border-[#FAFAF9]/10 py-6 px-4 mt-auto" aria-label="Site footer">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-center">

          <nav className="flex" aria-label="Footer navigation">
            <ul className="list-none p-0 m-0 flex gap-[22px] flex-wrap justify-center">
              <li>
                <a className="text-[#FAFAF9] no-underline tracking-[0.2px] hover:underline hover:decoration-4 hover:text-white" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-[#FAFAF9] no-underline tracking-[0.2px] hover:underline hover:decoration-4 hover:text-white" href="#">
                  Site Terms
                </a>
              </li>
              <li>
                <a className="text-[#FAFAF9] no-underline tracking-[0.2px] hover:underline hover:decoration-4 hover:text-white" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

        </div>

        <hr className="border-t border-[#FAFAF9]/15 my-[18px] mx-auto border-none h-px" />

        <div className="text-center">
          <p className="mb-[10px] text-[#FAFAF9]/90 leading-relaxed">
            © {year} Pokemon ROM Hack Collection. Not affiliated with Nintendo,
            Game Freak, or The Pokémon Company. This project is for educational
            purposes only.
          </p>

          <p className="m-0 text-[#FAFAF9]/90">
            Project Team: {members.join(" • ")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
