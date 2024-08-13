import { friendsModel } from "../models/friends.model.mjs";

function getFriends(request, reply) {
  reply.send(friendsModel);
}

function getFriend(request, reply) {
  const friendId = Number(request.params.friendId);
  const friend = friendsModel[friendId];

  if (friend) {
    reply.send(friend);
  } else {
    reply.statusCode = 404;
    throw new Error("Invalid friend id");
  }
}

function postFriend(request, reply) {
  if (!request.body.name) {
    reply.statusCode = 400;
    throw new Error("Bad request");
  }

  const newFriend = {
    name: request.body.name,
    id: friendsModel.length,
  };
  friendsModel.push(newFriend);
  reply.send(newFriend);
}

export { getFriends, getFriend, postFriend };
