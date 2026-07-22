import { fakerEN, fakerDE, fakerUK, Randomizer } from '@faker-js/faker';
import seedrandom from 'seedrandom';

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

const getFakerInstance = (region: string) => {
  switch (region) {
    case 'de_DE':
      return fakerDE;
    case 'uk_UA':
      return fakerUK;
    case 'en_US':
    default:
      return fakerEN;
  }
};

const calculateLikes = (avgLikes: number, rng: () => number): number => {
  const baseLikes = Math.floor(avgLikes);
  const fraction = avgLikes - baseLikes;
  const extraLike = rng() < fraction ? 1 : 0;
  return baseLikes + extraLike;
};

export const generateSongBatch = (
  region: string,
  userSeed: string,
  avgLikes: number,
  page: number,
  pageSize: number = 10
): Song[] => {
  const faker = getFakerInstance(region);
  const songs: Song[] = [];

  const startIndex = (page - 1) * pageSize;

  for (let i = 0; i < pageSize; i++) {
    const currentIndex = startIndex + i + 1;

    const songSeed = `${userSeed}-${currentIndex}`;
    
    const songRng = seedrandom(songSeed);

    faker.seed(Math.abs(songRng.int32()));

    const title = faker.music.songName();
    
    const artist = songRng() > 0.5 
      ? faker.person.fullName() 
      : `${faker.word.adjective()} ${faker.word.noun()}`;

    const album = songRng() < 0.3 ? 'Single' : faker.company.name();

    const genre = faker.music.genre();
    const reviewText = faker.lorem.paragraph();

    const likesRng = seedrandom(`${songSeed}-likes`);
    const likesCount = calculateLikes(avgLikes, likesRng);

    songs.push({
      id: songSeed,
      index: currentIndex,
      title,
      artist,
      album,
      genre,
      likesCount,
      reviewText,
    });
  }

  return songs;
};