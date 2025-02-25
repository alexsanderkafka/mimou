import React, { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
//import  { Redirect } from 'react-router-dom';

import instance from '../connect';
import Button from '../components/Button';

import IconUpload from '../assets/icons/upload.png';

interface FormProps{
  plan: number;
  setName: (state: string) => void; 
  setLoading: (state: boolean) => void;
  setPreviewImages: (state: any) => void;
}

function Form({ plan, setName, setLoading, setPreviewImages }: FormProps){
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [files, setFiles] = useState<File[] | null>();
    const [alertFile, setAlertFile] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [condition, setCondition] = useState<boolean>(false);

    useEffect(() => {
      console.log(alertFile);
    }, [alertFile]);

    useEffect(() => {

      if (files?.length) {
        const previews = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        
        setPreviewImages(previews);
        verifyFiles();

        if(plan === 1 && files?.length == 3) setCondition(true);
        if(plan === 2 && files?.length == 7) setCondition(true);
      }

    }, [files]);

    const onSubmit = async ( data:any ) => {

        const verifyResult = verifyFiles();

        console.log("Depois do verify " + alertFile);

        const name: string = data.name;
        const email: string = data.email;
        const message: string = data.message;

        const messageOne: string = data.messageOne;
        const messageTwo: string = data.messageTwo;
        const messageThree: string = data.messageThree;
	
        const messages = plan === 1 ? [message] : [messageOne, messageTwo, messageThree];
        
        const send = {
          name: name,
          email: email,
          message: messages,
          plan: plan
        }

        let formData = new FormData();

        formData.append("form", JSON.stringify(send));

        console.log("Antes do return: " + alertFile);

        if(verifyResult) return;

        console.log("Depois de return!!!");

        for (let i = 0; i < files!.length; i++) {
          formData.append("files", files![i]);
        }

        try{
          setLoading(true);

          const response = await instance.post('create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data;'
            }
          });

          if(response.status == 200){
            window.location.href = response.data.initPoint;
            //setLoading(false);
          }

        }catch(err){
          console.error("Error ao enviar os dados: " + err);
        }

    };


    function verifyFiles(){

      if(!files){
        setAlertFile(true);
        return true;
      };

      if(plan === 1 && files.length === 3){
        setAlertFile(false);
        return false;
      }

      if(plan === 2 && files.length === 7){
        setAlertFile(false);
        return false;
      }

      setAlertFile(true);
      return true;
    }

    function handleUploadButton(){
        fileInputRef.current?.click()
    }

    function renderAmountMessages(){
      if(plan === 1){
        return(
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'auto',
            height: 'auto',
          }}>
            <label>{errors.message ? errors.message.message?.toString() : "Mensagem"}</label>
              <textarea {...register('message', {
                required: "Por favor, digite a mensagem",
                maxLength:{
                  value: 500,
                  message: "A mensagem pode ter no máximo 500 caracteres!"
                }
              })}
              placeholder='Digite uma mensagem' rows={6}
              style={{
                borderColor: errors.message && "red"
              }}
              >
              </textarea>
          </div>
          
        );
      }else if(plan === 2){
        return(
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'auto',
            height: 'auto'
          }}>
              <label>{errors.message ? errors.message.message?.toString() : "Mensagem 1"}</label>
              <textarea {...register('messageOne', {
                required: "Por favor, digite a mensagem",
                maxLength:{
                  value: 500,
                  message: "A mensagem pode ter no máximo 500 caracteres!"
                }
              })}
              placeholder='Digite uma mensagem' rows={6}
              style={{
                borderColor: errors.message && "red"
              }}
              >
              </textarea>

              <label>{errors.message ? errors.message.message?.toString() : "Mensagem 2"}</label>
              <textarea {...register('messageTwo', {
                required: "Por favor, digite a mensagem",
                maxLength:{
                  value: 500,
                  message: "A mensagem pode ter no máximo 500 caracteres!"
                }
              })}
              placeholder='Digite uma mensagem' rows={6}
              style={{
                borderColor: errors.message && "red"
              }}
              >
              </textarea>

              <label>{errors.message ? errors.message.message?.toString() : "Mensagem 3"}</label>
              <textarea {...register('messageThree', {
                required: "Por favor, digite a mensagem",
                maxLength:{
                  value: 500,
                  message: "A mensagem pode ter no máximo 500 caracteres!"
                }
              })}
              placeholder='Digite uma mensagem' rows={6}
              style={{
                borderColor: errors.message && "red"
              }}
              >
              </textarea>
            </div>
        )
      }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>  
            <label>{errors.name ? errors.name.message?.toString() : "Nome do presenteado(a)"}</label>
            <input 
              {...register('name', {required: "Por favor, digite um nome!"})}
              type="text" placeholder='Nome do aniversariante'
              style={{
                borderColor: errors.name && "red"
              }}
              onChange={(e) => setName(e.target.value)}
            />

            <label>{errors.email ? errors.email.message?.toString() : "E-mail"}</label>
            <input 
              {...register('email', {
                required: "Por favor, digite um e-mail!",
                pattern:{
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Digite um e-mail válido!"
                }
              })} 
              type="email" id="email" placeholder='Email para receber o QR code'
              style={{
                borderColor: errors.name && "red"
              }}
            />

            {renderAmountMessages()}

            <label className='base-label'
              style={{
                color: alertFile ? "red" : undefined
              }}
            >
              { alertFile ? `Você precisa selecionar ${plan === 1 ? "3" : "7"}` : `Você tem o direito de até ${plan === 1 ? "3" : "7"} imagens`}
            </label>
            <label>{`Voce selecionou ${!files ? 0 : files.length}/${plan === 1 ? "3" : "7"}`}</label>
            <div id="container-file-button">
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setFiles((prevFiles) => [...(prevFiles || []), ...Array.from(e.target.files!)]);
                  }
                }}
              />

              <button className="custom-file-button"
                onClick={handleUploadButton}
                type="button"
                style={{
                  borderColor: alertFile && "red" || undefined
                }}
                disabled={condition}
              >
                <img src={IconUpload} alt="" />
                Escolha as fotos
              </button>
            </div>
            
            <Button type={'submit'}/>
          </form>
    );
}

export default Form;