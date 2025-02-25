import React, { useState } from "react";

import "../styles/ToggleButton.css";

interface ToggleButtonProps{
    setActive: (state: string) => void;
    setPlan: (state: number) => void;
    active: string;

}

function ToggleButton({active, setActive, setPlan}:ToggleButtonProps){

    return(
        <div className="container-toggle-button">
            <button
                className={`toggle-button ${active === "Carinho" ? "active" : ""}`}
                onClick={() => {
                    setActive("Carinho")
                    setPlan(1);
                }}
            >Carinho - R$ 9,00
            </button>

            <button
                className={`toggle-button ${active === "Encanto" ? "active" : ""}`}
                onClick={() => {
                    setActive("Encanto");
                    setPlan(2);
                }}
            >Encanto - R$ 14,00
            </button>
        </div>
    );
}

export default ToggleButton;