export type Vote = {
  title: string;
  hashtag: string;
  anwsers: { [key: string]: boolean };
}

export type Votes = { [key: string]: Vote }
