import HelpToggle from "./HelpToggle";
import StandardModal from "./StandardModal";
import Button from "./Buttons";
import * as registerFunction from '../functions/register-functions';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LoginInput() {
    const navigate = useNavigate();
    const [lista_users, setListaUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false); // Controle do modal

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

    const handleAutenticar = (event) => {
        event.preventDefault();
        let verifyUser = registerFunction.verificaLoginExistente(lista_users, username)
        if (verifyUser !== false || verifyUser!=null) {
            const user = registerFunction.verificarSenhaxLogin(lista_users, username);
            if (user && user.userPassword === password) {
                localStorage.setItem('login_check', JSON.stringify(user));
                setShowModal(true); 
            } else {
                alert('Usuário ou senha incorretos, tente novamente ou cadastre-se já');
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.scrollTo(0, 0);
        navigate('/');
        window.location.reload();
    };

        
    const buttons = [
        {
            handle: () => {
                handleAutenticar(); 
                window.location.reload(); 
            },
            divStyle: 'col-span-2 mb-3',
            title: 'Entrar',
        }
    ];
    

    return (
        <form className="px-7 grid justify-center items-center" onSubmit={handleAutenticar} method="POST">
            {showModal && (
                <StandardModal 
                    handleCloseModal={handleCloseModal}
                    atributes={{
                        title: "Seja bem-vindo de volta!",
                        text: '', 
                        cancelName: 'Fechar',
                    }}
                />
            )}
            <div className="grid grid-cols-2 gap-6 text-center" id="form">
                <h1 className="text-2xl col-span-2  text-blue-900 font-medium">Login</h1>
    
                <div className="col-span-2">
                    <div className="relative flex items-center">
                        <input
                            className="p-3 shadow-2xl glass w-full placeholder:italic placeholder:text-slate-400 outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                            type="text"
                            placeholder="ID de Usuário"
                            onChange={handleUsername}
                            id="Username"
                            name="username"
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="relative flex items-center">
                        <input
                            className="p-3 glass shadow-2xl w-full placeholder:italic placeholder:text-slate-400 outline-none focus:border-solid focus:border-[1px] border-[#035ec5] pr-10"
                            type="password"
                            placeholder="Senha"
                            id="password"
                            name="password"
                            required
                            onChange={handlePassword}
                        />
                    </div>
                </div>
    
                <Button dados={buttons} />
            </div>
        </form>
    );
}

export default LoginInput;
