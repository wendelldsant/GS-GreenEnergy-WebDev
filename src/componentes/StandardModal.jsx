import { Link } from "react-router-dom"; 

function StandardModal({ handleCloseModal, atributes, handlePurchase }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden z-10">
        <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full">
            <img src={atributes.image} alt="Modal Icon" className="w-12 h-12" />
          </div>
          <h4 className="text-xl text-gray-100 font-semibold mb-5">
            {atributes.title}
          </h4>
          <p className="text-gray-300 font-medium">
            {atributes.text}
          </p>
        </div>
        <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
          <button
            onClick={handleCloseModal}
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
          >
            {atributes.cancelName}
          </button>
          {atributes.confirmName && (
            typeof atributes.confirmName === 'string' ? (
              <button 
                onClick={handlePurchase}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200">
                {atributes.confirmName}
              </button>
            ) : (
              <div className="inline-block w-full sm:w-auto mb-2 text-center">
                {atributes.confirmName} 
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default StandardModal;
