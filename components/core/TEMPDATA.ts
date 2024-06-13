const ADMIN_ONE = {
  pk: "nfdjdsfghn3n4",
  username: "admin one",
  email: "adminone@gmail.com",
  picture:
    "https://res-console.cloudinary.com/derplm8c6/media_explorer_thumbnails/3d2ebe856e25a61a68b519ac4daf2cdc/detailed",
};

const MEMBER_ONE = {
  pk: "member1",
  username: "member one",
  email: "memberone@gmail.com",
  picture:
    "https://res-console.cloudinary.com/derplm8c6/media_explorer_thumbnails/6bea988dd5c76b077623838db26f5439/detailed",
};

const MEMBER_TWO = {
  pk: "member2",
  username: "member two",
  email: "membertwo@gmail.com",
  picture:
    "https://res-console.cloudinary.com/derplm8c6/media_explorer_thumbnails/6bea988dd5c76b077623838db26f5439/detailed",
};

const PULSE_ONE = {
  pk: "nfdjn3n454tf",
  title: "Create a navbar for our product",
  assigned: ["member1", "member2"],
  timeline: "",
  priority: "1",
  tag: "#TODO",
};
const PULSE_TWO = {
  pk: "nfdjn3n454tf",
  priority: "2",
  status: "2",
  title: "Create a Footer with company logo",
  assigned: ["member1", "member2"],
  timeline: "",
  tag: "#For Rohit",
};
const PULSE_THREE = {
  pk: "nfdjn3n454tf",
  priority: "3",
  title: "Remove all the use effects from code and start feom stratch",
  assigned: ["member1"],
  timeline: "",
  tag: "#For Rohit",
};

const SPRINT_ONE = {
  pk: "nfdjn3n4",
  title: "june Sprint",
  color: "yellow",
  pulses: [PULSE_TWO, PULSE_ONE, PULSE_TWO, PULSE_THREE],
};
const SPRINT_TWO = {
  pk: "nf4323n4",
  title: "July Sprint",
  color: "orange",
  pulses: [
    PULSE_TWO,
    PULSE_ONE,
    PULSE_THREE,
    PULSE_THREE,
    PULSE_ONE,
    PULSE_TWO,
  ],
};
const SPRINT_THREE = {
  pk: "nfgdfn4",
  title: "July Sprint",
  color: "lightgreen",
  pulses: [
    PULSE_ONE,
    PULSE_THREE,
    PULSE_TWO,
    PULSE_THREE,
    PULSE_ONE,
    PULSE_TWO,
  ],
};

const TEMP_BOARD = {
  pk: "nfdjn3n43234",
  title: "granite-stack board",
  description: "Granite stack is a good product",
  picture: "https://stiltsoft.com/wp-content/uploads/2022/10/pandadoc2.png",
  admins: [ADMIN_ONE, ADMIN_ONE, ADMIN_ONE],
  members: [MEMBER_ONE, MEMBER_TWO],
  statuses: [
    { title: "For Dev", color: "yellow", id: "1" },
    { title: "Done", color: "green", id: "2" },
    { title: "Under QA", color: "pink", id: "3" },
  ],
  priority: [
    { title: "Low", color: "orange", id: "1" },
    { title: "High", color: "green", id: "2" },
    { title: "Critical", color: "yellow", id: "3" },
  ],
  sprints: [
    SPRINT_ONE,
    SPRINT_TWO,
    SPRINT_THREE,
    SPRINT_TWO,
    SPRINT_TWO,
    SPRINT_TWO,
    SPRINT_TWO,
  ],
};
const tempboardarr = [1, 2, 3, 4].map((e) => ({
  ...TEMP_BOARD,
  pk: TEMP_BOARD.pk + e,
}));

const TEMP_USER = {
  pk: "nfdj432432n3n4",
  isAuthenticated: true,
  isLoading: false,
  username: "rohit",
  email: "rohit11@11.com",
  org: "granite-stack",
  picture:
    "https://res-console.cloudinary.com/derplm8c6/media_explorer_thumbnails/f57b47e7a470284681bc9e282059df02/detailed",
  boards: [...tempboardarr],
};

async function getBoard(id: string) {
  return await new Promise((r) => {
    setTimeout(() => {
      r(TEMP_BOARD);
    }, 1000);
  });
}
export { TEMP_USER, getBoard };
