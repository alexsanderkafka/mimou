import React from "react";

import "../styles/RotatingSlide.css";

interface RotatingSlideProps {
    images: string[];
}

export default function RotatingSlide({ images }: RotatingSlideProps) {
    return (
        <div className="content">
            {images.map((image, index) => (
                <span style={{"--i": index + 1} as React.CSSProperties}><img key={index} src={image} alt="" /></span>
            ))}
        </div>
    );

}