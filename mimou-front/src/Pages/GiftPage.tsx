import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import image from "../assets/image-test.jpg";
import ImageBalloon from "../assets/balloon.png"
import { Outlet, useParams } from "react-router-dom";
import instance from "../connect";
import {isMobile} from 'react-device-detect';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import RotatingSlide from "../components/RotatingSlide";

import "../styles/Reset.css";
import "../styles/GiftPage.css";
import BirthdayCard from "../components/BirthdayCard";
import Gallery from "../components/Gallery";



function GiftPage(){
    const [images, setImages] = useState<string[]>([]);
    const [phrases, setPhrases] = useState<string[]>([]);
    const [name, setName] = useState<string>();
    const [loadingPage, setLoadingPage] = useState<boolean>(false);

    const pathPattern = useParams();

    useEffect(() => {

        async function fetchData(){

            try {
                const response = await instance.get(`informations/${pathPattern.id}/${pathPattern.name}`);

                if(response.status === 200){
                    const body = response.data;

                    setImages(body.url);
                    setPhrases(body.phrases)
                    setName(body.name);
                }
            }catch (error) {
                console.log(error);
                setLoadingPage(true);
            }
        }

        fetchData();
       
    }, []);


    if(!loadingPage){
        return(
            <main id="gift-page">

                <BirthdayCard/>
                
                <Gallery images={images}/>
                
            <Outlet />
            </main>
        );
    }else{
        return(
            <main>
                <h1>Página não encontrada...</h1>
            </main>
        );
    }
}

/**
 * <section id="section-main-message">
                    <div className="header-main-message">
                        <h1>Feliz aniversário {name}</h1>
                    </div>
    
                    <div className="container-main">
                        <img src={ImageBalloon} alt=""/>
                        <p>Hoje é um dia único, assim como você! Que este novo ano traga muitos sorrisos, conquistas e momentos inesquecíveis. Feliz aniversário!</p>
                        <img src={ImageBalloon} alt=""/>
                    </div>
                </section>

                <div className="card-photos">
                    
                </div>

                <div className="gallery">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="" />
                    ))}
                </div>
 */

export default GiftPage;
