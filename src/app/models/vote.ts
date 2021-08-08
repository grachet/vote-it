export type Vote = {
  id: string;
  title: string;
  hashtag: string;
  anwsers: { [key: string]: boolean };
  thumbUp: number;
  thumbDown: number;
}

export type Votes = { [key: string]: Vote }
