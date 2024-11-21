import React, { useState } from 'react';
import Form from '../componentes/Form';
import LoginInput from '../componentes/LoginInput';
import Buttons from '../componentes/Buttons';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleCadastreSe = () => {
        setShowForm(true);
        setShowLogin(false); // Garantir que o login esteja oculto ao mostrar o formulário
    };

    const handleLogin = () => {
        setShowLogin(true);
        setShowForm(false); // Garantir que o formulário esteja oculto ao mostrar o login
    };

    const handleVoltar = (event) => {
        event.preventDefault();
        setShowForm(false);  // Ocultar o formulário
        setShowLogin(false); // Ocultar o login
    };

    const buttonsOnpage = [
        {
            handle: handleCadastreSe,
            divStyle: 'col-span-2 my-3 ',
            title: 'Cadastre-se'
        },
        {
            handle: handleLogin,
            divStyle: 'col-span-2',
            title: 'Login'
        }
    ];
    
    const buttonVoltar = [
        {
            handle: handleVoltar,
            divStyle: 'col-span-2',
            title: 'Voltar'
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <section className="text-xl flex flex-col items-center">
                {!showForm && !showLogin && (
                    <>
                    <Buttons dados = {buttonsOnpage}/>
                    </>
                )}

                {showLogin && (
                    <>
                        <LoginInput />
                        <Buttons dados={buttonVoltar} /> {/* Botão de voltar */}
                    </>
                )}
                {showForm && (
                    <>
                        <Form />
                        <Buttons dados={buttonVoltar} /> {/* Botão de voltar */}
                    </>
                )}
            </section>
        </div>
    );
}

export default Register;
