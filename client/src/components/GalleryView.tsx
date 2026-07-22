import React from 'react';
import type { Song } from '../types/music';
import { AlbumCover } from './AlbumCover';
import { playGeneratedMelody } from '../utils/audio';

interface GalleryViewProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ songs, onSelectSong }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => onSelectSong(song)}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col hover:border-slate-700 transition-all shadow-lg hover:shadow-xl group cursor-pointer"
        >
          <div className="mb-4">
            <AlbumCover seed={song.id} title={song.title} artist={song.artist} size="lg" />
          </div>

          <div className="flex-1 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-slate-800 text-blue-400 px-2 py-0.5 rounded border border-slate-700">
                {song.genre}
              </span>
              <p className="text-xs text-slate-400 italic mt-2 line-clamp-1">Album: {song.album}</p>
            </div>

            <div className="flex justify-between items-center border-t border-slate-800 pt-3 mt-2 text-xs">
              <span className="text-rose-400 font-mono font-semibold">❤️ {song.likesCount}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playGeneratedMelody(song.id);
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-xs flex items-center gap-1 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                ▶ Play
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};