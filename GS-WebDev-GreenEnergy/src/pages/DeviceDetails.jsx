import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DeviceDetails() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const APIkey = '7cb582f4b193ca52d9e0e433c5a0c616'
  useEffect(() => {
    const loginCheck = JSON.parse(localStorage.getItem('login_check'));
    if (loginCheck) {
      const deviceFound = (loginCheck.devices || []).find((dev) => dev.id === id);
      setDevice(deviceFound);
      if (deviceFound && deviceFound.latitude && deviceFound.longitude) {
        const fetchApiData = () => {
          setLoading(true);
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${deviceFound.latitude}&lon=${deviceFound.longitude}&appid=${APIkey}&units=metric`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro  ao carregar os dados de clima")
              }
              return response.json();
            })
            .then((result) => {
              setApiData(result);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Erro ao buscar dados na API: ", error);
              setLoading(false);
            })
        }

        fetchApiData();
        // const interval = setInterval(fetchapiData, 2000);

        return () => { };
      }

    }
  }, [id]);


  if (!device) {
    return <div>Dispositivo não encontrado.</div>;
  }

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="grid grid-cols-4 mx-auto p-6 bg-gray-50 gap-4">
      <header className="col-span-4 mb-8 text-center">
        <h1 className="text-3xl font-bold text-orange-600">Monitoramento - Sun Catcher - {device.nickname}</h1>
      </header>
      <section className="lg:col-span-2 col-span-4 p-6 bg-white rounded-lg shadow">
        <h2 className="text-center text-xl font-semibold text-gray-700">Informações do Dispositivo</h2>
        <div className='flex justify-around'>
          <div className='my-auto'>
            <p className="mt-4 text-lg">
              <strong className="font-semibold">Apelido:</strong> {device.nickname}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">ID:</strong> {device.id}
            </p>
          </div>
          <div>
            <p className="mt-4 text-lg">
              <strong className="font-semibold">Latitude:</strong> {device.latitude}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Longitude:</strong> {device.longitude}
            </p>
          </div>
        </div>
      </section>
      <section className="lg:col-span-2 col-span-4 p-6 bg-white rounded-lg shadow flex flex-col">
        <h2 className="text-xl text-center font-semibold text-gray-700">Clima Local</h2>
        <div className='mt-4 flex justify-around'>
          <img src={apiData?.weather[0]?.icon ? `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png` : ''} alt="Icone Condição Climática" />
          <div className='my-auto'>
            <p className="text-lg">
              <strong className="font-semibold">Cidade:</strong> {apiData?.name ?? 'Erro ao localizar cidade'}  {/*verificação incluida porque essa função foi descontinuada pela API*/}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Descrição:</strong> {apiData.weather[0].description}
            </p>
          </div>
          <div className='my-auto'>
            <p className="text-lg">
              <strong className="font-semibold">Temperatura:</strong> {apiData.main.temp}°C
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Umidade:</strong> {apiData.main.humidity}%  
            </p>
          </div>
        </div>
      </section>
      <section className="lg:col-span-2 sm:col-span-1 p-6 bg-white rounded-lg shadow flex flex-col">
        <h2 className="text-xl text-center font-semibold text-gray-700">Luminosidade</h2>
        <div className='mt-4 flex justify-around'>
          <div className='my-auto'>
            <p className="text-lg">
              <strong className="font-semibold">Sensor Superior Esquerdo:</strong> 
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Sensor Inferior Esquerdo:</strong> 
            </p>
          </div>
          <div className='my-auto'>
            <p className="text-lg">
              <strong className="font-semibold">Sensor Superior Direito:</strong> 
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Sensor Inferior Direito:</strong>
            </p>
          </div>
        </div>
      </section>
      <section className="lg:col-span-2 sm:col-span-1 p-6 bg-white rounded-lg shadow flex flex-col">
        <h2 className="text-xl text-center font-semibold text-gray-700">Posição Angular</h2>
        <div className='mt-4 flex justify-around'>
          <div className='my-auto'>
            <p className="text-lg">
              <strong className="font-semibold">Motor Horizontal:</strong>° 
            </p>
          </div>
          <div className='my-auto'>
            <p className="text-lg">
              <strong className="font-semibold">Motor Vertical:</strong>° 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DeviceDetails;
