import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Opponents() {
  const navigate = useNavigate();
  const [opponents, setOpponents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    loadOpponents();
  }, []);

  async function loadOpponents() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    setCurrentUser(user);

    // Get all users except current user
    const { data: users } = await supabase
      .from('users')
      .select(`
        *,
        heroes (*)
      `)
      .neq('id', user.id);

    if (users) {
      setOpponents(users);
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Opponents</h2>
        {currentUser && (
          <p className="mb-4">You have {currentUser.left_fights || 3} fights left!</p>
        )}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opponents.map((opponent) => (
                <tr key={opponent.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{opponent.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{opponent.level_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{opponent.health_point}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{opponent.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/play/${opponent.username}`)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Fight!
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}