import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">MY BRUTE</h2>
        <div className="space-y-4">
          <Link to="/signup" className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600">
            SIGN UP
          </Link>
          <Link to="/login" className="block w-full bg-green-500 text-white text-center py-2 rounded hover:bg-green-600">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}