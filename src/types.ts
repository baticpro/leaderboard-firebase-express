type OS = 'iOS' | 'android';

export interface Leader {
  device: string;
  deviceId: string;
  gameId: string;
  lang: string;
  name: string;
  os: OS;
  scores: number;
}

export interface Leaders {
  leaders: Leader[];
}
