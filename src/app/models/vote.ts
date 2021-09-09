export type Vote = {
  index: number;
  title: string;
  hashtag: string;
  timestamp: string;
  // anwsers: { [key: string]: boolean };
  thumbUp: number;
  thumbDown: number;
  isMyVoteUp: boolean;
  isMyVoteDown: boolean;
}

export type Votes = { [key: string]: Vote }
