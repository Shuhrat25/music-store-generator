export interface Song {
  id: string;
  index: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  likesCount: number;
  reviewText: string;
}

export type Region = 'en_US' | 'de_DE' | 'uk_UA';