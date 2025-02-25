import React, { useEffect, useState } from 'react';
import '../styles/Reset.css';
import '../styles/Create.css';
import Header from '../components/Header';

import Footer from '../components/Footer';

import IconLock from '../assets/icons/lock.png';
import IconHome from '../assets/icons/home.png';
import IconMoreInformation from '../assets/icons/more-information.png';
import IconHelp from '../assets/icons/help.png';

import ToggleButton from '../components/ToggleButton';

import Form from '../components/Form';
import { Outlet } from 'react-router-dom';

import ClipLoader from "react-spinners/SyncLoader";
import BirthdayCard from '../components/BirthdayCard';
import Gallery from '../components/Gallery';

import ImageFake from '../assets/image-test.jpg';

function Create() {

  const [customUrl, setCustomUrl] = useState("seu-nome");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(1);
  const [active, setActive] = useState("Carinho")
  const [previewImage, setPreviewImages] = useState();

  const images = [
    ImageFake,
    ImageFake,
    ImageFake
  ]

  if(!loading){
    return (
      <main>
        <Header />
        <div className='container'> 
          <div className="container-forms">
            <div className="box-row">
              <ToggleButton active={active} setActive={setActive} setPlan={setPlan}/>
            
              <img src={IconHelp} alt="" className="config-icon" />
            </div>
  
            <Form plan={plan} setName={setCustomUrl} setLoading={setLoading} setPreviewImages={setPreviewImages}/>
          </div>
  
          <div className="container-preview">
            <h1 style={{color: '#343A40', marginBottom: '20px'}}>Prévia</h1>
  
            <div id="emulator">
              <div className="box-header-emulator">
                <img src={IconHome} alt="" />
                <div id="url-emulator">
                  <img src={IconLock} alt="" />
                  <span>mimou.com.br/1/{customUrl.replaceAll(' ', '-').toLowerCase()}</span>
                </div>
                <div className="tab">
                  1
                </div>
                <img src={IconMoreInformation} alt="" />
              </div>
  
              <div id="screen">
                <BirthdayCard />
                {
                  previewImage && (
                    <Gallery images={previewImage}/>
                  )
                }
              </div>
            </div>
          </div>
  
        </div>

        <Footer />
        <Outlet />
      </main>
    );
  }else{
    return(
      <main id="loading">
        <ClipLoader
        color='#F08080'
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />

        <h1>Enviando os dados para o servidor...</h1>
      </main>
    );
  }

  
}

/*<div id="container-loading">
          treste
        </div>*/
export default Create;
