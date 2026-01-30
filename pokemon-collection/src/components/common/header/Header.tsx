import dean from '../../../assets/dean_github.png'
import zach from '../../../assets/zach_github.png'
import efe from '../../../assets/efe_github.png'

interface HeaderProp {
    title?: string;
}
 
function Header({ title = "Pokemon ROM Hack Collection" }: HeaderProp) {
    return(
        <header className="flex justify-between items-center">
            <h1 className='title'>{title}</h1>
            
            <ul className="list-none flex p-0">
                <li className="pt-[15px] pr-[10px]">
                    <a href="https://github.com/dmartin34-rrc">
                    <img src={dean} alt="Dean's GitHub Profile Picture" className="rounded-full w-[50px]"/></a>
                </li>
                <li className="pt-[15px] pr-[10px]">
                    <a href="https://github.com/zachary-lam">
                    <img src={zach} alt="Zach's GitHub Profile Picture" className="rounded-full w-[50px]"/></a>
                </li>
                <li className="pt-[15px] pr-[10px]">
                    <a href="https://github.com/EfeOnota">
                    <img src={efe} alt="Efe's GitHub Profile Picture" className="rounded-full w-[50px]"/></a>
                </li>
            </ul>
        </header>
    );
}

export default Header;