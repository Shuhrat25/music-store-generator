import React from 'react';
import type { Region, Song } from '../types/music';
import { exportToCsv } from '../utils/exportCsv';

interface ToolbarProps {
  region: Region;
  setRegion: (r: Region) => void;
  seed: string;
  setSeed: (s: string) => void;
  likes: number;
  setLikes: (l: number) => void;
  viewMode: 'table' | 'gallery';
  setViewMode: (v: 'table' | 'gallery') => void;
  songs: Song[];
}

export const Toolbar: React.FC<ToolbarProps> = ({
  region,
  setRegion,
  seed,
  setSeed,
  likes,
  setLikes,
  viewMode,
  setViewMode,
  songs,
}) => {
  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
    setSeed(randomSeed);
  };

  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-900 border border-slate-800 text-white rounded-2xl mb-6 shadow-xl">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Language / Region</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as Region)}
          className="bg-slate-800 text-white px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="en_US">🇺🇸 English (USA)</option>
          <option value="de_DE">🇩🇪 German (Germany)</option>
          <option value="uk_UA">🇺🇦 Ukrainian (Ukraine)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Seed (64-bit)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="bg-slate-800 text-white px-3 py-2 rounded-xl border border-slate-700 w-44 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
          <button
            onClick={generateRandomSeed}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-3 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
            title="Generate Random Seed"
          >
            🔀 Random
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
          <span className="text-slate-400">Likes / Song:</span>
          <span className="text-blue-400 font-mono font-bold text-sm ml-2">{likes}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={likes}
          onChange={(e) => setLikes(parseFloat(e.target.value))}
          className="w-40 accent-blue-500 cursor-pointer mt-2"
        />
      </div>

      <button
        onClick={() => exportToCsv(songs, `songs_${region}_seed_${seed}.csv`)}
        className="ml-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        title="Export to CSV"
      >
        📥 Export CSV
      </button>

      <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
        <button
          onClick={() => setViewMode('table')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            viewMode === 'table' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode('gallery')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            viewMode === 'gallery' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Gallery View
        </button>
      </div>
    </div>
  );
};