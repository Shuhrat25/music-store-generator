import type { Song } from '../types/music';

export const exportToCsv = (songs: Song[], filename: string = 'songs.csv') => {
  if (!songs || !songs.length) {
    alert('Нет данных для экспорта!');
    return;
  }

  const headers = ['Index', 'Title', 'Artist', 'Album', 'Genre', 'Likes', 'ID'];
  const DELIMITER = ';';

  const rows = songs.map((song) => [
    song.index,
    `"${(song.title || '').replace(/"/g, '""')}"`,
    `"${(song.artist || '').replace(/"/g, '""')}"`,
    `"${(song.album || '').replace(/"/g, '""')}"`,
    `"${(song.genre || '').replace(/"/g, '""')}"`,
    song.likesCount,
    `"${song.id}"`,
  ]);

  const csvText = [
    `sep=${DELIMITER}`,
    headers.join(DELIMITER),
    ...rows.map((row) => row.join(DELIMITER)),
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvText], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};