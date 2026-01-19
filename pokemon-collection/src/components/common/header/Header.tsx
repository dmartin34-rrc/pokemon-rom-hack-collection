import './Header.css';
import dean from '../../../../public/dean_github.png'
import zach from '../../../../public/zach_github.png'
import efe from '../../../../public/efe_github.png'
 
function Header() {
    return(
        <header className="header">
            <h1 className='title'>Pokemon ROM Hack Collection</h1>
            
            <ul className='github-profiles'>
                <li>
                    <a href="https://github.com/dmartin34-rrc"><img src={dean} alt="Dean's GitHub Profile Picture" id='dean'/></a>
                </li>
                <li>
                    <a href="https://github.com/zachary-lam"><img src={zach} alt="Zach's GitHub Profile Picture" id='zach'/></a>
                </li>
                <li>
                    <a href="https://github.com/EfeOnota"><img src={efe} alt="Efe's GitHub Profile Picture" id='efe'/></a>
                </li>
            </ul>
        </header>
    );
}

export default Header;