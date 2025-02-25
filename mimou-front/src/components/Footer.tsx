import React from "react";
import '../styles/Footer.css';
import logo from '../assets/logov2.png';
import { SocialIcon } from "react-social-icons";


function Footer(){
    return(
        <footer>
            <div className="container-itens-footer">
                <div className="footer-sessions">
                    <h1>Sobre</h1>
                    <ul>
                        <li><a href="###">Quem somos</a></li>        
                    </ul>
                </div>
                <div className="footer-sessions">
                    <h1>Suporte</h1>
                    <ul>
                        <li><a href="###">E-mail</a></li>
                        <li><a href="###">Telefone</a></li>        
                    </ul>
                </div>

                <div className="footer-sessions">
                    <h1>Termos</h1>
                    <ul>
                        <li><a href="###">Uso</a></li>
                        <li><a href="###">Privacidade</a></li>        
                    </ul>
                </div>

                <div className="footer-sessions">
                <h1>Redes sociais</h1>
                <div className="social-icons">
                    <a href="https://www.instagram.com/limetocode/"><SocialIcon url="https://www.instagram.com" style={{ color: 'black' }}/></a>
                    <a href="https://wa.me/5548988108366?text=Olá,%20tenho%20interesse%20em%20mais%20informações." className="whatsapp-link" target="_blank"><SocialIcon url="https://www.whatsapp.com" style={{ color: 'black' }}/></a>
                </div>
                </div>
            </div>

            
            <a href="###" className="logo"><img src={logo} alt="" /></a>

            <div id="copyright">
                &copy; 2025 Mimou - Todos os direitos reservados.
            </div>
        </footer>
    );
}

export default Footer;