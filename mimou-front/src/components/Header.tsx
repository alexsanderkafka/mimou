import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logov2.png';

function Header(){
    return(
        <header>
            <img src={logo} alt="Logo mimou" className='logo' />
        </header>
    );
}

export default Header;  