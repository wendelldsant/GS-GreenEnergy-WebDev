function UserInfo({userOnline, devices}) {
    return (
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
    );
}

export default UserInfo;