export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl?: string;
  youtubeId: string;
  duration: number; // in seconds
}

export const MAHFIL_PLAYLIST: Track[] = [
  {
    id: 'yt-1',
    title: 'Woh Meri Neend Mera Chain',
    artist: 'Sadhana Sargam & Sanjeev Kumar',
    album: 'Gajab Tamasa (1992)',
    coverUrl: 'https://i.ytimg.com/vi/55d3-8YwHq8/hqdefault.jpg',
    youtubeId: '55d3-8YwHq8',
    duration: 296,
  },
  {
    id: 'yt-2',
    title: 'Pehla Nasha Pehla Khumar',
    artist: 'Udit Narayan & Sadhana Sargam',
    album: 'Jo Jeeta Wohi Sikandar (1992)',
    coverUrl: 'https://i.ytimg.com/vi/uJ2QhL330zM/hqdefault.jpg',
    youtubeId: 'uJ2QhL330zM',
    duration: 284,
  },
  {
    id: 'yt-3',
    title: 'Tujhe Dekha To Yeh Jaana Sanam',
    artist: 'Kumar Sanu & Lata Mangeshkar',
    album: 'Dilwale Dulhania Le Jayenge (1995)',
    coverUrl: 'https://i.ytimg.com/vi/cNV5hLSa9S8/hqdefault.jpg',
    youtubeId: 'cNV5hLSa9S8',
    duration: 302,
  },
  {
    id: 'yt-4',
    title: 'Bahon Ke Darmiyan',
    artist: 'Alka Yagnik & Hariharan',
    album: 'Khamoshi: The Musical (1996)',
    coverUrl: 'https://i.ytimg.com/vi/I0_tO2tU0h0/hqdefault.jpg',
    youtubeId: 'I0_tO2tU0h0',
    duration: 362,
  },
  {
    id: 'yt-5',
    title: 'Chura Ke Dil Mera Goriya Chali',
    artist: 'Kumar Sanu & Alka Yagnik',
    album: 'Main Khiladi Tu Anari (1994)',
    coverUrl: 'https://i.ytimg.com/vi/m0L03P8B-2s/hqdefault.jpg',
    youtubeId: 'm0L03P8B-2s',
    duration: 270,
  },
  {
    id: 'yt-6',
    title: '90s Bollywood Lofi Retro Chill',
    artist: 'Mahfil Radio Session',
    album: 'Mahfil Special Playlist',
    coverUrl: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
    youtubeId: '5qap5aO4i9A',
    duration: 3600,
  },
];
