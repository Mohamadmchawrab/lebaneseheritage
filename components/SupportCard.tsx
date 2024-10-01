'use client'

import React, { useState } from 'react';

interface SupportCardProps {
  name: string;
  img?: string;
  type?: string;
}

const SupportCard: React.FC<SupportCardProps> = ({ name, img, type }) => {
  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        onClick={toggleModal} // Toggle the modal on card click
        className="bg-white-800 shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-5 m-4 transition-transform transform hover:scale-105 cursor-pointer"
      >
          <>
            {img && (
              <img
                src={img}
                alt={`Image of ${name}`}
                className="w-32 h-32 rounded-full mb-3 border-4 border-white shadow-md"
              />
            )}
            <span className="text-lg font-semibold text-white">{name}</span>
          </>
      </div>

      {/* Modal for 'whish' type */}
      {isModalOpen && (type === 'whish') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center transform transition-all scale-105">
            <h2 className="text-2xl font-extrabold text-red-500 mb-4">
              Support ❤️ Lebanon
            </h2>
            <p className="text-lg font-medium text-gray-700">Let's make a difference together!</p>
            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-800 mb-2">Name: <span className="text-gray-600">Mohamad Mshawrab</span></p>
              <p className="text-xl font-semibold text-gray-800">Phone: <span className="text-gray-600">+96171480345</span></p>
            </div>
            <button
              onClick={toggleModal}
              className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for 'card' type with updated IBAN details */}
      {isModalOpen && (type === 'card') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center transform transition-all scale-105">
            <h2 className="text-2xl font-extrabold text-red-500 mb-4">
              Support ❤️ Lebanon
            </h2>
            <p className="text-lg font-medium text-gray-700">Your generous donations help us make a real impact!</p>
            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Account Holder: <span className="text-gray-600">MOHAMAD FOUAD MCHAWRAB</span>
              </p>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                IBAN: <span className="text-gray-600">LB07005699840103500483130002</span>
              </p>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                SWIFT Code: <span className="text-gray-600">AUDBLBBX</span>
              </p>
              <p className="text-xl font-semibold text-gray-800">
                Currency: <span className="text-gray-600">USD Fresh</span>
              </p>
            </div>
            <button
              onClick={toggleModal}
              className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportCard;
