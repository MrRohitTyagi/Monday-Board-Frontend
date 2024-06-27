export type ConfigType = {
  belongsTo: string;
  _id: string;
  staredBoards: string[];
};
export type ConfigStoreType = {
  belongsTo: string;
  _id: string;
  staredBoards: string[];
  likedChats: string[];
  likedThreads: string[];
  getConfig: () => void;
  starBoard: (e: string) => void;
  unstarBoard: (e: string) => void;

  likeChat: (e: string) => void;
  unlikeChat: (e: string) => void;
  likeThread: (e: string) => void;
  unlikeThread: (e: string) => void;
};
