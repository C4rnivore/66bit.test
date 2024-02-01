import { NavLink } from 'react-router-dom';
import './header.css'


function Header() {
    return ( 
        <header id={'header'}>
            <nav className='header_nav'>
                <ul>
                    <li>
                        <NavLink 
                            className={(isActive) => isActive ? "active" : "" } 
                            to={'/'}>Новости</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={(isActive) => isActive ? "active" : "" } 
                            to={'/themes'}>Темы</NavLink>
                    </li>
                </ul>
            </nav>
        </header> 
    );
}

export default Header;