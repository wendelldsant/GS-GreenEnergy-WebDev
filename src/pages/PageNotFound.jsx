import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white">
      <div className="w-24 h-24 bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 rounded-full animate-spin mb-8"></div>
      <h1 className="text-4xl font-bold mb-4">Página Não Encontrada</h1>
      <p className="text-lg mb-6"> Vamos voltar para a página inicial?</p>
      <a href="/" className="px-6 py-3 bg-orange-600 rounded-lg text-lg hover:bg-yellow-400 transition-colors">Voltar para a Página Inicial</a>
    </div>
  );
};

export default PageNotFound;
