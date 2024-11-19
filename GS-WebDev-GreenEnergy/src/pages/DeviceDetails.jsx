import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DeviceDetails() {
  const { id } = useParams();
  const [device, setDevice] = useState(null); 

  useEffect(() => {
    const loginCheck = JSON.parse(localStorage.getItem('login_check'));
    if (loginCheck) {
      const deviceFound = (loginCheck.devices || []).find((dev) => dev.id === id);
      setDevice(deviceFound);
    }
  }, [id]);

  if (!device) {
    return <div>Dispositivo não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-orange-600">Detalhes do Dispositivo</h1>
      </header>
      <section className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700">{device.nickname}</h2>
        <p className="mt-4 text-lg">
          <span className="font-semibold">ID:</span> {device.id}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Região:</span> {device.region}
        </p>
      </section>
    </div>
  );
}

export default DeviceDetails;
