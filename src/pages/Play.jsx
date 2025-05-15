import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Play() {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleAttack = () => {
    navigate(`/result/${username}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Play</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Character</h3>
              {/* TODO: Add player stats */}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Opponent: {username}</h3>
              {/* TODO: Add opponent stats */}
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={handleAttack}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600"
            >
              ATTACK!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}