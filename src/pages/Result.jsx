import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Result() {
  const { username } = useParams();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Battle Result</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Winner</h3>
              {/* TODO: Add winner stats */}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Loser</h3>
              {/* TODO: Add loser stats */}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/opponents"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
            >
              PLAY AGAIN!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}