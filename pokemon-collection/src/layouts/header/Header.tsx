// images
import dean from '../../assets/dean_github.png';
import zach from '../../assets/zach_github.png';
import efe from '../../assets/efe_github.png';
// components
import Button from '../../components/ui/Button';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Pokemon ROM Hack Collection',
}): React.JSX.Element => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="title">{title}</h1>

      <ul className="list-none flex p-0">
        <li className="pt-[15px] pr-[10px]">
          <Button href="https://github.com/dmartin34-rrc">
            <img
              className="rounded-full w-[50px]"
              src={dean}
              alt="Dean's GitHub Profile Picture"
            />
          </Button>
        </li>

        <li className="pt-[15px] pr-[10px]">
          <Button href="https://github.com/zachary-lam">
            <img
              className="rounded-full w-[50px]"
              src={zach}
              alt="Zach's GitHub Profile Picture"
            />
          </Button>
        </li>

        <li className="pt-[15px] pr-[10px]">
          <Button href="https://github.com/EfeOnota">
            <img
              className="rounded-full w-[50px]"
              src={efe}
              alt="Efe's GitHub Profile Picture"
            />
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
