import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Play() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    loadBattleData();
  }, [username]);

  async function loadBattleData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    // Load player data
    const { data: playerData } = await supabase
      .from('users')
      .select(`
        *,
        heroes (*)
      `)
      .eq('id', user.id)
      .single();

    // Load opponent data
    const { data: opponentData } = await supabase
      .from('users')
      .select(`
        *,
        heroes (*)
      `)
      .eq('username', username)
      .single();

    setPlayer(playerData);
    setOpponent(opponentData);
  }

  const handleAttack = async () => {
    if (!player || !opponent) return;

    // Create battle record
    const { data: battle } = await supabase
      .from('battles')
      .insert({
        attacker_id: player.id,
        defender_id: opponent.id,
        winner_id: Math.random() > 0.5 ? player.id : opponent.id // Simplified battle logic
      })
      .select()
      .single();

    navigate(`/result/${username}`, { state: { battleId: battle.id } });
  };

  if (!player || !opponent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Battle Arena</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Character</h3>
              <div className="space-y-2">
                <p>Level: {player.level_id}</p>
                <p>Health: {player.health_point}</p>
                <p>Experience: {player.experience}</p>
                <p>Strength: {player.heroes?.[0]?.strength || 10}</p>
                <p>Agility: {player.heroes?.[0]?.agility || 10}</p>
                <p>Speed: {player.heroes?.[0]?.speed || 10}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Opponent: {opponent.username}</h3>
              <div className="space-y-2">
                <p>Level: {opponent.level_id}</p>
                <p>Health: {opponent.health_point}</p>
                <p>Experience: {opponent.experience}</p>
                <p>Strength: {opponent.heroes?.[0]?.strength || 10}</p>
                <p>Agility: {opponent.heroes?.[0]?.agility || 10}</p>
                <p>Speed: {opponent.heroes?.[0]?.speed || 10}</p>
              </div>
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