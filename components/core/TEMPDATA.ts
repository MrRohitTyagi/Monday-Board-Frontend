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
  tag: "#TODO",
};

const SPRINT_ONE = {
  pk: "nfdjn3n4",
  title: "JUNE Sprint",
  color: "yellow",
  pulses: [PULSE_ONE],
};

const TEMP_BOARD = {
  pk: "nfdjn3n43234",
  title: "granite-stack board",
  description: "Granite stack is a good product",
  picture: "https://stiltsoft.com/wp-content/uploads/2022/10/pandadoc2.png",
  admins: [ADMIN_ONE, ADMIN_ONE, ADMIN_ONE],
  members: [MEMBER_ONE, MEMBER_TWO],
  statuses: [
    { title: "For Dev", color: "yellow" },
    { title: "Done", color: "green" },
    { title: "Under QA", color: "pink" },
  ],
  priority: [
    { title: "Low", color: "purple" },
    { title: "High", color: "green" },
    { title: "Critical", color: "yellow" },
  ],
  sprints: [SPRINT_ONE],
};

const TEMP_USER = {
  pk: "nfdj432432n3n4",
  isAuthenticated: true,
  isLoading: false,
  username: "rohit",
  email: "rohit11@11.com",
  org: "granite-stack",
  picture:
    "https://res-console.cloudinary.com/derplm8c6/media_explorer_thumbnails/f57b47e7a470284681bc9e282059df02/detailed",
  boards: [TEMP_BOARD],
};

async function getBoard(id: string) {
  return await new Promise((r) => {
    setTimeout(() => {
      r(TEMP_BOARD);
    }, 1000);
  });
}
export { TEMP_USER, getBoard };
