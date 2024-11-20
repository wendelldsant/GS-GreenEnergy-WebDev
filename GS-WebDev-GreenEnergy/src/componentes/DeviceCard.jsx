import { Link } from 'react-router-dom';

function DeviceCard({ devices, setDevices, userOnline, setUserOnline}) {

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

    return (
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700">Seus Dispositivos</h2>
            {devices.length === 0 ? (
                <p className="mt-4 text-gray-500">Nenhum dispositivo cadastrado.</p>
            ) : (

                <div className="mt-4 space-y-4">
                    {devices.map((device, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
                        >
                            <h3 className="text-lg font-medium text-gray-700">{device.nickname}</h3>
                            <p className="text-sm text-gray-500">ID: {device.id}</p>
                            <p className="text-sm text-gray-500">Latitude: {device.latitude}</p>
                            <p className="text-sm text-gray-500">Longitude: {device.longitude}</p>
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
                        </div>

                    ))}
                </div>

            )}
        </section>


    );
}

export default DeviceCard;