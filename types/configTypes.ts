export type ConfigType = {
  belongsTo: string;
  _id: string;
  staredBoards: string[];
};
export type ConfigStoreType = {
  belongsTo: string;
  search: string;
  user: string;
  status: string;
  priority: string;
  _id: string;
  staredBoards: string[];
  likedChats: string[];
  likedThreads: string[];

  setSearch: (e: string) => void;
  setUser: (e: string) => void;
  setStatus: (e: string) => void;
  setPriority: (e: string) => void;

  getConfig: () => void;
  starBoard: (e: string) => void;
  unstarBoard: (e: string) => void;

  likeChat: (e: string) => void;
  unlikeChat: (e: string) => void;

  likeThread: (e: string) => void;
  unlikeThread: (e: string) => void;
};
