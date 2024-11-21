import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceCard from '../componentes/DeviceCard';
import UserInfo from '../componentes/UserInfo';
import RegisterDevice from '../componentes/RegisterDevice';

function Profile() {
    const navigate = useNavigate();
    const [userOnline, setUserOnline] = useState(null);
    const [devices, setDevices] = useState([]);
    const [newDevice, setNewDevice] = useState({ id: '', nickname: '', region: '' });

    useEffect(() => {
        const listaUsers = JSON.parse(localStorage.getItem('lista_users')) || [];
        const loginCheck = JSON.parse(localStorage.getItem('login_check'));

        if (loginCheck && listaUsers.find((user) => user.userId === loginCheck.userId)) {
            setUserOnline(loginCheck);
            setDevices(loginCheck.devices || []);
        } else {
            setUserOnline(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.setItem('login_check', JSON.stringify(false));
        setUserOnline(null);
        navigate('/');
        window.location.reload();
    };

    if (userOnline === null) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-center text-gray-800">Carregando...</h1>
            </div>
        );
    }

    if (userOnline === false) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-center text-gray-800">Faça seu Login ou Cadastre-se!</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-orange-600">Perfil</h1>
                <p className="text-lg text-gray-600">Gerencie seus dispositivos solares</p>
            </header>

            <UserInfo 
            userOnline={userOnline} devices={devices}
            />

            <DeviceCard 
            devices={devices} setDevices={setDevices} 
            userOnline={userOnline} setUserOnline={setUserOnline}
            />

            <RegisterDevice 
            setDevices={setDevices} devices={devices} 
            setNewDevice={setNewDevice} newDevice={newDevice} 
            userOnline={userOnline} setUserOnline={setUserOnline}
            />

            <div className="mt-8 text-center">
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}

export default Profile;
