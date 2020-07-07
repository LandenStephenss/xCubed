// var nowPlaying = new Set();
// module.exports = class TTT {
//   constructor(players, channel, client) {
//     this.p1 = players[0];
//     this.p2 = players[1];
//     this.channel = channel;
//     this.client = client;
//     this.message = null;
//     this.playerTurn = 0;
//     this.board = {
//       a1: null,
//       a2: null,
//       a3: null,
//       b1: null,
//       b2: null,
//       b3: null,
//       c1: null,
//       c2: null,
//       c3: null,
//     };
//   }

//   async Start() {
//     if (nowPlaying.has(this.p1) || nowPlaying.has(this.p2)) return;
//     nowPlaying.add(this.p1);
//     nowPlaying.add(this.p2);
//     this.Move();
//   }
//   async Move() {
//     if (this.playerTurn === 0) {
//       if (this.message) this.message.delete();
//       this.message = await this.channel.send({
//         content: `<@${this.p1}>, please select one of the options to play! \`a, b,c\`, \`1, 2, 3\`. (Ex. \`a1\`, \`b2\`, \`c3\`)`,
//         embed: {
//           title: `<@${this.client.users.cache.get(this.p1).username}>'s turn`,
//           description: `${
//             this.board.a1 === null ? "⬛" : this.board.a1 === 0 ? "❌" : "⭕"
//           }${
//             this.board.a2 === null ? "⬛" : this.board.a2 === 0 ? "❌" : "⭕"
//           }${
//             this.board.a3 === null ? "⬛" : this.board.a3 === 0 ? "❌" : "⭕"
//           }\n${
//             this.board.b1 === null ? "⬛" : this.board.b1 === 0 ? "❌" : "⭕"
//           }${
//             this.board.b2 === null ? "⬛" : this.board.b2 === 0 ? "❌" : "⭕"
//           }${
//             this.board.b3 === null ? "⬛" : this.board.b3 === 0 ? "❌" : "⭕"
//           }\n${
//             this.board.c1 === null ? "⬛" : this.board.c1 === 0 ? "❌" : "⭕"
//           }${
//             this.board.c2 === null ? "⬛" : this.board.c2 === 0 ? "❌" : "⭕"
//           }${
//             this.board.c3 === null ? "⬛" : this.board.c3 === 0 ? "❌" : "⭕"
//           }`,
//           color: parseInt("877EEB", 16),
//         },
//       });
//       this.channel
//         .awaitMessages((message) => message.author.id === this.p1, {
//           max: 1,
//           time: 60000,
//           errors: ["time"],
//         })
//         .then(async (collected) => {
//           switch (collected.first().content.toLowerCase()) {
//             case "a1" && this.board.a1 === null:
//               this.board.a1 = 0;
//               break;
//             case "a2" && this.board.a1 === null:
//               this.board.a2 = 0;
//               break;
//             case "a3" && this.board.a1 === null:
//               this.board.a3 = 0;
//               break;
//             case "b1" && this.board.a1 === null:
//               this.board.b1 = 0;
//               break;
//             case "b2" && this.board.a1 === null:
//               this.board.b2 = 0;
//               break;
//             case "b3" && this.board.a1 === null:
//               this.board.b3 = 0;
//               break;
//             case "c1" && this.board.a1 === null:
//               this.board.c1 = 0;
//               break;
//             case "c2" && this.board.a1 === null:
//               this.board.c2 = 0;
//               break;
//             case "c3" && this.board.a1 === null:
//               this.board.c3 = 0;
//               break;
//             default:
//               this.Move();
//               break;
//           }
//           // need to check for wins here
//         })
//         .catch((c) => {
//           this.channel.send(
//             `${
//               this.client.users.cache.get(this.p1).username
//             } did not play back in time!`
//           );
//           nowPlaying.delete(this.p1);
//           nowPlaying.delete(this.p2);
//         });
//     } else {
//       if (this.message) this.message.delete();
//       this.message = await this.channel.send({
//         content: `<@${this.p2}>, please select one of the options to play! \`a, b,c\`, \`1, 2, 3\`. (Ex. \`a1\`, \`b2\`, \`c3\`)`,
//         embed: {
//           title: `<@${this.client.users.cache.get(this.p2).username}>'s turn`,
//           description: `${
//             this.board.a1 === null ? "⬛" : this.board.a1 === 0 ? "❌" : "⭕"
//           }${
//             this.board.a2 === null ? "⬛" : this.board.a2 === 0 ? "❌" : "⭕"
//           }${
//             this.board.a3 === null ? "⬛" : this.board.a3 === 0 ? "❌" : "⭕"
//           }\n${
//             this.board.b1 === null ? "⬛" : this.board.b1 === 0 ? "❌" : "⭕"
//           }${
//             this.board.b2 === null ? "⬛" : this.board.b2 === 0 ? "❌" : "⭕"
//           }${
//             this.board.b3 === null ? "⬛" : this.board.b3 === 0 ? "❌" : "⭕"
//           }\n${
//             this.board.c1 === null ? "⬛" : this.board.c1 === 0 ? "❌" : "⭕"
//           }${
//             this.board.c2 === null ? "⬛" : this.board.c2 === 0 ? "❌" : "⭕"
//           }${
//             this.board.c3 === null ? "⬛" : this.board.c3 === 0 ? "❌" : "⭕"
//           }`,
//           color: parseInt("877EEB", 16),
//         },
//       });
//       this.channel
//         .awaitMessages((message) => message.author.id === this.p2, {
//           max: 1,
//           time: 60000,
//           errors: ["time"],
//         })
//         .then(async (collected) => {
//           switch (collected.first().content.toLowerCase()) {
//             case "a1" && this.board.a1 === null:
//               this.board.a1 = 1;
//               break;
//             case "a2" && this.board.a1 === null:
//               this.board.a2 = 1;
//               break;
//             case "a3" && this.board.a1 === null:
//               this.board.a3 = 1;
//               break;
//             case "b1" && this.board.a1 === null:
//               this.board.b1 = 1;
//               break;
//             case "b2" && this.board.a1 === null:
//               this.board.b2 = 1;
//               break;
//             case "b3" && this.board.a1 === null:
//               this.board.b3 = 1;
//               break;
//             case "c1" && this.board.a1 === null:
//               this.board.c1 = 1;
//               break;
//             case "c2" && this.board.a1 === null:
//               this.board.c2 = 1;
//               break;
//             case "c3" && this.board.a1 === null:
//               this.board.c3 = 1;
//               break;
//             default:
//               this.Move();
//               break;
//           }
//           // need to check for wins here
//         })
//         .catch((c) => {
//           this.channel.send(
//             `${
//               this.client.users.cache.get(this.p2).username
//             } did not play back in time!`
//           );
//           nowPlaying.delete(this.p1);
//           nowPlaying.delete(this.p2);
//         });
//     }
//   }
// };
