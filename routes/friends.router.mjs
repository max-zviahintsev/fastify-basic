import {
  getFriends,
  getFriend,
  postFriend,
} from "../controllers/friends.controller.mjs";

async function friendsRoutes(f, options) {
  f.use((req, res, next) => {
    console.log("ip address", req.ip);
    next();
  });

  f.get("/friends", getFriends);
  f.get("/friends/:friendId", getFriend);
  f.post("/friends", postFriend);
}

export default friendsRoutes;
