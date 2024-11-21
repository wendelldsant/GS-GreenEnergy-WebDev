import { useState, useEffect } from "react";
import HelpToggle from "./HelpToggle";
import * as registerFunction from '../functions/register-functions';
import Buttons from "./Buttons";
import { useNavigate } from 'react-router-dom';
import StandardModal from "./StandardModal";
import InputRegisterForm from "./InputRegisterForm";

function Forms() {
    const navigate = useNavigate();
    const helpTexts = {
        senha: 'Sua senha deve conter pelo menos: um número, uma letra maiúscula, uma letra minúscula, 7 caracteres, um caracter especial',
        username_text: 'Seu nome de usuário não pode conter menos de 5 caracteres'
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [lista_users, setListaUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('lista_users')) || [];
        setListaUsers(users);
    }, []);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handlePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
    };
    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.scrollTo(0, 0);
        navigate('/');
        window.location.reload();
    };

    const handleVerify = (event) => {
        event.preventDefault();
        if (name === '' || password === '') {
            alert('Preencha todos os campos');
            return;
        }

        let profile_username = registerFunction.verificaUsername(username, lista_users);
        let profile_password = registerFunction.verificaSenha(password, passwordConfirm);

        if (profile_username && profile_password) {
            const new_user = {
                userId: username,
                userCompleteName: name,
                userPassword: password,
                userDispositivos: '0'
            };

            // Atualiza a lista de usuários e armazena no localStorage
            const updated_users = [...lista_users, new_user];
            setListaUsers(updated_users);
            localStorage.setItem('lista_users', JSON.stringify(updated_users));

            const user_online = {
                userId: username,
                userCompleteName: name,
                userPassword: password,
                userDispositivos: '0'
            };
            localStorage.setItem('login_check', JSON.stringify(user_online));
            setShowModal(true);
        }
    };

    const buttons = [
        {
            handle: handleVerify,
            title: 'Cadastre-se',
            divStyle: 'col-span-2 mb-3'
        }
    ];
    

    return (
        <form className="px-7 grid justify-center items-center">
            {showModal && (
                <StandardModal 
                    handleCloseModal={handleCloseModal}
                    atributes={{
                        title: "Seja bem-vindo!",
                        text: 'Cadastro efetuado com sucesso!', 
                        cancelName: "Conheça nossa plataforma",
                    }}
                    
                />
            )}
            <div className="grid grid-cols-2 gap-6 text-center" id="form">
                <h1 className="text-2xl col-span-2 text-blue-900 font-medium">Cadastre-se!</h1>
                <InputRegisterForm handle={handleName} id={name} placeholder={'Nome Completo'} />
                <InputRegisterForm handle={handleUsername} id={username} placeholder={'Nome de Usuário'} helpText={helpTexts.username_text} />
                <InputRegisterForm handle={handlePassword} id={password} placeholder={'Senha'} helpText={helpTexts.senha} typeInput = "password" />
                <InputRegisterForm handle={handlePasswordConfirm} id={password-confirm} placeholder={'Confirme sua Senha'} typeInput = "password"  />
                <div className="mt-4 col-span-2">
                    <Buttons dados={buttons} />
                </div>
                
            </div>
        </form>
    );
}

export default Forms;
