import { v4 } from "uuid";

export function getTempStatuses() {
  return {
    [v4().slice(0, 12)]: {
      id: "8a385fe3-31e",
      color: "rgba(42,117,38,1)",
      title: "Done",
      isEditing: false,
      textColor: "rgba(210,254,153,1)",
    },
    [v4().slice(0, 12)]: {
      id: "181affbf-e50",
      color: "rgba(82,15,128,1)",
      title: "Under QA",
      isEditing: false,
      textColor: "rgba(230,228,245,1)",
    },
    [v4().slice(0, 12)]: {
      id: "4f6f3577-622",
      color: "rgba(27,50,212,1)",
      title: "Working on it",
      isEditing: false,
      textColor: "rgba(223,234,242,1)",
    },
    [v4().slice(0, 12)]: {
      id: "c7fd031e-c75",
      color: "rgba(189,13,82,1)",
      title: "On hold",
      isEditing: false,
      textColor: "rgba(255,255,255,1)",
    },
  };
}

export function getTempPriorities() {
  return {
    [v4().slice(0, 12)]: {
      id: "8a385fe3-31e",
      color: "rgba(59,165,53,1)",
      title: "Low",
      isEditing: false,
      textColor: "rgba(223,234,242,1)",
    },
    [v4().slice(0, 12)]: {
      id: "181affbf-e50",
      color: "rgba(26,164,178,1)",
      title: "Medium",
      isEditing: false,
      textColor: "rgba(223,234,242,1)",
    },
    [v4().slice(0, 12)]: {
      id: "4f6f3577-622",
      color: "rgba(170,125,22,1)",
      title: "High",
      isEditing: false,
      textColor: "rgba(223,234,242,1)",
    },
    [v4().slice(0, 12)]: {
      id: "c7fd031e-c75",
      color: "rgba(188,28,13,1)",
      title: "Critical",
      isEditing: false,
      textColor: "rgba(255,255,255,1)",
    },
  };
}
