import React from "react";
import { useState, useEffect } from "react";

import "../styles/Gallery.css";

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps){

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return(
        <div className="box-gallery">
            <div className="gallery">
                {images.map((src, index) => (
                    <img
                    key={index}
                    src={src}
                    alt={`Imagem ${index + 1}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        transition: "opacity 1s ease-in-out",
                        opacity: index === currentIndex ? 1 : 0,
                    }}
                    />
                ))}
            </div>
        </div>
    );
}