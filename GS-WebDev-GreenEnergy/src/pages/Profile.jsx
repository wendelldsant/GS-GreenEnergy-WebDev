import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    const handleAddDevice = () => {
        if (newDevice.id && newDevice.nickname && newDevice.region) {
            const updatedDevices = [...devices, newDevice];
            setDevices(updatedDevices);
            setNewDevice({ id: '', nickname: '', region: '' });

            const updatedUser = { ...userOnline, devices: updatedDevices };
            setUserOnline(updatedUser);

            const allUsers = JSON.parse(localStorage.getItem('lista_users')) || [];
            const updatedUsers = allUsers.map((user) =>
                user.userId === updatedUser.userId ? updatedUser : user
            );

            localStorage.setItem('lista_users', JSON.stringify(updatedUsers));
            localStorage.setItem('login_check', JSON.stringify(updatedUser));
        }
    };

    const handleDeleteDevice = (id) => {
        const updatedDevices = devices.filter((device) => device.id !== id);
        setDevices(updatedDevices);

        const updatedUser = { ...userOnline, devices: updatedDevices };
        setUserOnline(updatedUser);

        const allUsers = JSON.parse(localStorage.getItem('lista_users')) || [];
        const updatedUsers = allUsers.map((user) =>
            user.userId === updatedUser.userId ? updatedUser : user
        );

        localStorage.setItem('lista_users', JSON.stringify(updatedUsers));
        localStorage.setItem('login_check', JSON.stringify(updatedUser));
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

            <section className="mb-8 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700">Dados Pessoais</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Nome</p>
                        <p className="text-lg font-medium">{userOnline.userCompleteName || 'Nome não disponível'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">ID</p>
                        <p className="text-lg font-medium">{userOnline.userId || 'ID não disponível'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Número de Dispositivos</p>
                        <p className="text-lg font-medium">{devices.length}</p>
                    </div>
                </div>
            </section>

            <section className="mb-8 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700">Seus Dispositivos</h2>
                {devices.length === 0 ? (
                    <p className="mt-4 text-gray-500">Nenhum dispositivo cadastrado.</p>
                ) : (
                    <ul className="mt-4 space-y-4">
                        {devices.map((device, index) => (
                            <li
                                key={index}
                                className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
                            >
                                <h3 className="text-lg font-medium text-gray-700">{device.nickname}</h3>
                                <p className="text-sm text-gray-500">ID: {device.id}</p>
                                <p className="text-sm text-gray-500">Região: {device.region}</p>
                                <Link
                                    to={`/profile/${device.id}`}
                                    className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Ver Detalhes
                                </Link>
                                <button 
                                    onClick={() => handleDeleteDevice(device.id)}
                                    className="mt-2 mx-5 inline-block text-red-400 hover:text-red-600"
                                >
                                    Excluir
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="mb-8 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700">Cadastrar Novo Dispositivo</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <input
                        type="text"
                        placeholder="ID do Dispositivo"
                        value={newDevice.id}
                        onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Apelido"
                        value={newDevice.nickname}
                        onChange={(e) => setNewDevice({ ...newDevice, nickname: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Região"
                        value={newDevice.region}
                        onChange={(e) => setNewDevice({ ...newDevice, region: e.target.value })}
                        className="p-2 border rounded"
                    />
                </div>
                <button
                    onClick={handleAddDevice}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    Cadastrar
                </button>
            </section>

            <section className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700">Condições Climáticas</h2>
                <div className="mt-4">
                    <p className="text-lg">
                        <span className="font-semibold">Temperatura:</span> 25°C
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Condição:</span> Ensolarado
                    </p>
                </div>
            </section>

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
