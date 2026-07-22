import React, { useState, useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import { TableView } from './components/TableView';
import { GalleryView } from './components/GalleryView';
import { SongModal } from './components/SongModal';
import type { Song, Region } from './types/music';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const App: React.FC = () => {
  const [region, setRegion] = useState<Region>('en_US');
  const [seed, setSeed] = useState<string>('12345');
  const [likes, setLikes] = useState<number>(3.5);
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');
  const [page, setPage] = useState<number>(1);

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleRegionChange = (r: Region) => {
    setRegion(r);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSeedChange = (s: string) => {
    setSeed(s);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewModeChange = (v: 'table' | 'gallery') => {
    setViewMode(v);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let ignore = false;

    const loadSongs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/songs?region=${region}&seed=${seed}&likes=${likes}&page=${page}&limit=10`
        );
        const data: Song[] = await response.json();

        if (!ignore) {
          setSongs((prev) => (viewMode === 'gallery' && page > 1 ? [...prev, ...data] : data));
        }
      } catch (err) {
        console.error('Failed to fetch songs:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadSongs();

    return () => {
      ignore = true;
    };
  }, [region, seed, likes, page, viewMode]);

  useEffect(() => {
    if (viewMode !== 'gallery') return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode, loading]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
            Music Store Showcase
          </h1>
          <p className="text-xs text-slate-400 mt-1">Procedural Deterministic Generator</p>
        </div>
      </header>

      <Toolbar
        region={region}
        setRegion={handleRegionChange}
        seed={seed}
        setSeed={handleSeedChange}
        likes={likes}
        setLikes={setLikes}
        viewMode={viewMode}
        setViewMode={handleViewModeChange}
        songs={songs}
      />

      {viewMode === 'table' ? (
        <>
          <TableView songs={songs} onSelectSong={setSelectedSong} />
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-5 py-2.5 bg-slate-900 border border-slate-800 disabled:opacity-40 hover:border-slate-700 rounded-xl font-medium transition-all cursor-pointer"
            >
              ← Previous
            </button>
            <span className="font-mono text-sm text-slate-400">Page {page}</span>
            <button
              disabled={loading}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl font-medium transition-all cursor-pointer"
            >
              Next →
            </button>
          </div>
        </>
      ) : (
        <>
          <GalleryView songs={songs} onSelectSong={setSelectedSong} />
          {loading && (
            <div className="text-center py-8 text-slate-500 font-medium">Loading more tracks...</div>
          )}
        </>
      )}

      <SongModal song={selectedSong} onClose={() => setSelectedSong(null)} />
    </div>
  );
};

export default App;