import React from "react";
import '../styles/Reset.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/LandingPage.css';
import ComunGift from '../assets/image/gift.png';
import GoldGift from '../assets/image/gold-gift.png';
import Button from "../components/Button";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { Outlet, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";

import ImageForm from '../assets/forms.png';
import ImageMoney from '../assets/money.png';
import ImageEmail from '../assets/email.png';
import ImageSendGift from '../assets/send-gift.png';

function LandingPage(){

    const navigate = useNavigate();
    return(
        <main>
            <Header />
            <section id="section-hero">
                <div className="container-texts">
                    <h1>Encante</h1>
                    <h3>Com um presente web</h3>
                    <p>Crie uma página web de presente</p>
                    <p>Compartilhe o presente especial com a pessoa escpecial.</p>

                    <Button text="Crie o presente" className="custom-button-two" onClick={() => navigate('/create')}/>
                </div>

                <img src={ComunGift} alt="" />
            </section>

            <section id="section-tutorial">
                <h1 className="title-sections">Como fazer</h1>
                <div className="container-steps">
                    <div className="step">
                        <h3 className="title-step">Preencha o formulário</h3>
                        <div className="box-step">
                            <img src={ImageForm} alt="" />
                        </div>
                    </div>
                    <div className="step">
                        <h3 className="title-step">Faça o pagamento</h3>
                        <div className="box-step">
                        <img src={ImageMoney} alt="" />
                        </div>
                    </div>
                    <div className="step">
                        <h3 className="title-step">Receba o E-mail</h3>
                        <div className="box-step">
                            <img src={ImageEmail} alt="" />
                        </div>
                    </div>
                    <div className="step">
                        <h3 className="title-step">Envie seu presente</h3>
                        <div className="box-step">
                            <img src={ImageSendGift} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="section-price">
                <h1 className="title-sections">Valores</h1>

                <div id="container-price">
                    <div className="box-price">
                        <div className="header-box-price">
                            <div className="box-texts">
                                <h2>Carinho</h2>
                                <h1>R$ 9,00</h1>
                            </div>
                            <img src={ComunGift} alt="" />
                        </div>

                        <div className="itens-plan">
                            <div className="item">
                                <CheckIcon style={{color: "#BF6064"}}/>
                                <p>3 fotos</p>
                            </div>

                            <div className="item">
                                <CheckIcon style={{color: "#BF6064"}}/>
                                <p>1 Frase</p>
                            </div>

                            <div className="item">
                                <CheckIcon style={{color: "#BF6064"}}/>
                                <p>2 dias de acesso</p>
                            </div>
                        </div>

                        <Button text="Crie o presente" onClick={() => navigate('/create')}/>
                    </div>

                    <div className="box-price">
                        <div className="header-box-price">
                            <div className="box-texts">
                                <h2>Carinho</h2>
                                <h1>R$ 14,00</h1>
                            </div>
                            <img src={GoldGift} alt="" />
                        </div>

                        <div className="itens-plan">
                            <div className="item">
                                <CheckIcon style={{color: "#BF6064"}}/>
                                <p>7 fotos</p>
                            </div>

                            <div className="item">
                                <CheckIcon style={{color: "#BF6064"}}/>
                                <p>3 Frases</p>
                            </div>

                            <div className="item">
                                <CheckIcon style={{color: "#BF6064"}}/>
                                <p>7 dias de acesso</p>
                            </div>
                        </div>

                        <Button text="Crie o presente" onClick={() => navigate('/create')}/>
                    </div>
                </div>

            </section>

            <section id="section-questions">
                <h1 className="title-sections">Perguntas Frequentes</h1>

                <Accordion 
                    title="O que é a mimou?" 
                    content="Mimou é uma plataforma que cria paginas web como um presente de aniversário."
                />

                <Accordion 
                    title="Quais formas de pagamento são aceitas?" 
                    content="No momento aceitamos pagamento via PIX e Cartão."
                />

                <Accordion 
                    title="Quanto tempo para receber o QR Code?" 
                    content="Após a confirmação de pagamento o QR Code será enviado para o e-mail."
                />

                <Accordion 
                    title="Preciso baixar algo para usar o Mimou?" 
                    content="Não, o Mimou é uma aplicação web."
                />

            </section>

            <section id="section-call-to-action">
                <div id="box-call-to-action">

                    <div className="texts-call-to-action">
                        <h1>Pronto para criar uma memória inesquecível?</h1>
                        <p>Comece agora, é rápido e fácil.</p>

                        <Button text="Crie o presente" onClick={() => navigate('/create')}/>
                    </div>

                    <img src={ComunGift} alt="" />
                </div>
            </section>
            <Footer />
            <Outlet/>
        </main>
    );
}

export default LandingPage;