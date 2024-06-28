export type ConfigType = {
  belongsTo: string;
  _id: string;
  staredBoards: string[];
};
export type SingleBoardFilterType = {
  [key: string]: {
    search: string;
    user: string;
    status: string;
    priority: string;
  };
};
export type PulseHeightType = "sm" | "md" | "lg";
export type ConfigStoreType = {
  belongsTo: string;
  _id: string;
  staredBoards: string[];
  likedChats: string[];
  likedThreads: string[];
  themeID: string;
  pulseHeight: PulseHeightType;
  filters: SingleBoardFilterType;

  setSearch: (e: string, board_id: string) => void;
  setUser: (e: string, board_id: string) => void;
  setStatus: (e: string, board_id: string) => void;
  setPriority: (e: string, board_id: string) => void;

  getConfig: () => void;
  starBoard: (e: string) => void;
  unstarBoard: (e: string) => void;

  likeChat: (e: string) => void;
  unlikeChat: (e: string) => void;

  likeThread: (e: string) => void;
  unlikeThread: (e: string) => void;

  setTheme: (e: string) => void;
  setPulseHeight: (e: PulseHeightType) => void;
};
