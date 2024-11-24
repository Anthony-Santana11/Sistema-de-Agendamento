import './Header.modules.css';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className='logo-site'>
                <a href="/">
                    <img className="logo-img" src="/src/assets/logo.png" alt="Logo" />
                </a>
            </div>
            <button className='btn' onClick={() => window.location.href = '/agendar'}>Agendar Online</button>
            <nav>
                <div className='nav'>
                    <button className='nav-btn' onClick={toggleMenu}>
                        <FaBars />
                    </button>
                    {isMenuOpen && (
                        <ul className='nav-list'>
                            <li><button className='nav-item'>Unidades</button></li>
                            <li><button className='nav-item'>Sobre Nós</button></li>
                            <li><button className='nav-item'>Agendamento Online</button></li>
                            <li><button className='nav-item'>Perguntas Frequentes (FAQ)</button></li>
                            <li><button className='nav-item'>Exames e Resultados</button></li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    )
}