function RegisterDevice({setDevices, devices, setNewDevice, newDevice, userOnline, setUserOnline}) {
    const handleAddDevice = () => {
        if (newDevice.id && newDevice.nickname && newDevice.latitude && newDevice.longitude) {
            const updatedDevices = [...devices, newDevice];
            setDevices(updatedDevices);
            setNewDevice({ id: '', nickname: '', latitude: '', longitude: '' });

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

    return (
        
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
                    placeholder="Latitude"
                    value={newDevice.latitude}
                    onChange={(e) => setNewDevice({ ...newDevice, latitude: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={newDevice.longitude}
                    onChange={(e) => setNewDevice({ ...newDevice, longitude: e.target.value })}
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
    );
}

export default RegisterDevice;