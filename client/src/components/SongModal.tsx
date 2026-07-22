import React from 'react';
import type { Song } from '../types/music';
import { AlbumCover } from './AlbumCover';
import { playGeneratedMelody } from '../utils/audio';

interface SongModalProps {
  song: Song | null;
  onClose: () => void;
}

export const SongModal: React.FC<SongModalProps> = ({ song, onClose }) => {
  if (!song) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 transition-all cursor-pointer"
        >
          ✕
        </button>

        <div className="w-full max-w-[240px] mx-auto mb-6">
          <AlbumCover seed={song.id} title={song.title} artist={song.artist} size="lg" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">{song.title}</h2>
          <p className="text-blue-400 font-medium text-base mb-2">{song.artist}</p>
          <div className="flex justify-center items-center gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 bg-slate-800 rounded-full border border-slate-700">{song.album}</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded-full border border-slate-700">{song.genre}</span>
          </div>
        </div>

        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 mb-6 flex justify-around text-center">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Likes</p>
            <p className="text-lg font-bold text-rose-400 mt-0.5">❤️ {song.likesCount}</p>
          </div>
          <div className="border-r border-slate-800" />
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Index</p>
            <p className="text-lg font-mono font-bold text-slate-300 mt-0.5">#{song.index}</p>
          </div>
        </div>

        <button
          onClick={() => playGeneratedMelody(song.id)}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>▶ Play Full Preview</span>
        </button>
      </div>
    </div>
  );
};