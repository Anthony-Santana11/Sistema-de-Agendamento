import { FaWhatsapp } from 'react-icons/fa';
import './Nav.modules.css'

function Nav() {
    const handleContactClick = () => {
        window.open('https://wa.me/yourwhatsappnumber', '_blank');
    };

    return (
        <div>
            <h1 className = 'contact-text'>Entre em Contato <br />Para Mais Informações</h1>
            <button className="contact-button" onClick={handleContactClick}>
                <FaWhatsapp /> Entrar em Contato
            </button>
        </div>

    );
}

export default Nav;
