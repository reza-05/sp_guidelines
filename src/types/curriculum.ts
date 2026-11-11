export interface VideoLecture {
  id: string;
  title: string;
  url: string;
}

export interface Problem {
  id: string;
  numId: string;
  title: string;
  platform: 'CodeChef' | 'Codeforces';
  badgeText: string;
  badgeClass: string;
  desc: string;
  url: string;
  btnClass: string;
}

export interface DayCurriculum {
  day: number;
  module: number;
  moduleName: string;
  title: string;
  tagline: string;
  theme: string;
  bct: VideoLecture[];
  ac: VideoLecture[];
  problems: Problem[];
}
