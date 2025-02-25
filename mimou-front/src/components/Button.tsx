import React from "react";
import '../styles/Button.css';

interface ButtonProps{
    text?: string;
    className?: string;
    onClick?: () => void;
    type?: any;
    condition?: boolean;
}

function Button({ text = "Finalizar", className = "custom-button-one", onClick, type = '', condition = false }: ButtonProps){

    return(
        <button className={className} onClick={onClick} type={type} disabled={condition}>
            {text}
        </button>
    );
}

export default Button;