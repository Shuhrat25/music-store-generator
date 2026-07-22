import React, { useState } from 'react';
import type { Song } from '../types/music';
import { AlbumCover } from './AlbumCover';
import { playGeneratedMelody } from '../utils/audio';

interface TableViewProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

export const TableView: React.FC<TableViewProps> = ({ songs, onSelectSong }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto bg-slate-900 rounded-2xl shadow-xl border border-slate-800">
      <table className="w-full text-left text-slate-300">
        <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase border-b border-slate-700/50">
          <tr>
            <th className="py-3 px-4 w-16">#</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Artist</th>
            <th className="py-3 px-4">Album</th>
            <th className="py-3 px-4">Genre</th>
            <th className="py-3 px-4 w-28 text-right">Likes</th>
            <th className="py-3 px-4 w-16 text-center">Info</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => {
            const isExpanded = expandedId === song.id;
            return (
              <React.Fragment key={song.id}>
                <tr
                  onClick={() => setExpandedId(isExpanded ? null : song.id)}
                  className="border-b border-slate-800/50 hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">{song.index}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playGeneratedMelody(song.id);
                        }}
                        className="w-8 h-8 rounded-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition-all border border-blue-500/30 cursor-pointer"
                        title="Play Preview"
                      >
                        ▶
                      </button>
                      <span>{song.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{song.artist}</td>
                  <td className="py-3.5 px-4 italic text-slate-400">{song.album}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-800 text-blue-400 border border-slate-700/60 text-xs px-2.5 py-1 rounded-md">
                      {song.genre}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-rose-400">
                    ❤️ {song.likesCount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSong(song);
                      }}
                      className="text-slate-400 hover:text-white hover:bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer mx-auto"
                      title="View Details"
                    >
                      🔍
                    </button>
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="bg-slate-950/60 border-b border-slate-800">
                    <td colSpan={7} className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <AlbumCover seed={song.id} title={song.title} artist={song.artist} size="md" />

                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-xl font-bold text-white">{song.title}</h3>
                            <p className="text-sm text-slate-400">
                              {song.artist} • <span className="italic">{song.album}</span>
                            </p>
                          </div>

                          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 italic">
                            "{song.reviewText}"
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};