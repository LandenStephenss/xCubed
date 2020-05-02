const nowPlaying = new Set();
class TTT {
	constructor(players, channel, client) {
		this.playerOne = players[0];
		this.playerTwo = players[1];
		this.channel = channel;
		this.client = client;
		this.lastMSG = null;
		this.board = {
			a1: null,
			a2: null,
			a3: null,
			b1: null,
			b2: null,
			b3: null,
			c1: null,
			c2: null,
			c3: null
		};
		this.playerTurn = 0;
	}

	async start() {
		if (nowPlaying.has(this.playerOne)) return;
		nowPlaying.add(this.playerOne);
		this.Move(this.playerTurn);
	}
	checkWin() {
		if (this.board.a1 === this.board.a2 && this.board.a2 === this.board.a3 && this.board.a1 !== null && this.board.a2 !== null && this.board.a3 !== null) {
			return true;
		} else if (this.board.b1 === this.board.b2 && this.board.b2 === this.board.b3 && this.board.b1 !== null && this.board.b2 !== null && this.board.b3 !== null) {
			return true;
		} else if (this.board.c1 === this.board.c2 && this.board.c2 === this.board.c3 && this.board.c1 !== null && this.board.c2 !== null && this.board.c3 !== null) {
			return true;
		} else if (this.board.a1 === this.board.b1 && this.board.b1 === this.board.c1 && this.board.a1 !== null && this.board.b1 !== null && this.board.c1 !== null) {
			return true;
		} else if (this.board.a2 === this.board.b2 && this.board.b2 === this.board.c2 && this.board.a2 !== null && this.board.b2 !== null && this.board.c2 !== null) {
			return true;
		} else if (this.board.a3 === this.board.b3 && this.board.b3 === this.board.c3 && this.board.a3 !== null && this.board.b3 !== null && this.board.c3 !== null) {
			return true;
		} else if (this.board.a1 === this.board.b2 && this.board.b2 === this.board.c3 && this.board.a1 !== null && this.board.b2 !== null && this.board.c3 !== null) {
			return true;
		} else if (this.board.a3 === this.board.b2 && this.board.b2 === this.board.c1 && this.board.a3 !== null && this.board.b2 !== null && this.board.c1 !== null) {
			return true;
		} else {
			return false;
		}
	}
	checkDraw() {
		if(this.board.a1 !== null && this.board.a2 !== null && this.board.a3 !== null && this.board.b1 !== null && this.board.b2 !== null && this.board.b3 !== null && this.board.c1 !== null && this.board.c2 !== null && this.board.c3 !== null) {
			return true;
		} else {
			return false;
		}
	}
	async Move(playerTurn) {
		if (playerTurn === 0) {
			if (this.lastMSG !== null) {
				this.lastMSG.delete();
			}
			this.lastMSG = await this.channel.send({
				content: `<@${this.playerOne}>, please select one of the options to play! \`a, b, c\`, \`1, 2, 3\` (Ex. \`a1\`, \`b2\`, or \`c3\`)`,
				embed: {
					title: this.playerTurn === 0 ? `${this.client.users.cache.get(this.playerOne).username}'s turn` : `${this.client.users.cache.get(this.playerTwo).username}'s turn`,
					description: `${this.board.a1 === null ? '⬛' : this.board.a1 === 0 ? '❌' : '⭕'}${this.board.a2 === null ? '⬛' : this.board.a2 === 0 ? '❌' : '⭕'}${this.board.a3 === null ? '⬛' : this.board.a3 === 0 ? '❌' : '⭕'}\n${this.board.b1 === null ? '⬛' : this.board.b1 === 0 ? '❌' : '⭕'}${this.board.b2 === null ? '⬛' : this.board.b2 === 0 ? '❌' : '⭕'}${this.board.b3 === null ? '⬛' : this.board.b3 === 0 ? '❌' : '⭕'}\n${this.board.c1 === null ? '⬛' : this.board.c1 === 0 ? '❌' : '⭕'}${this.board.c2 === null ? '⬛' : this.board.c2 === 0 ? '❌' : '⭕'}${this.board.c3 === null ? '⬛' : this.board.c3 === 0 ? '❌' : '⭕'}`,
					color: parseInt('877EEB', 16)
				}
			});
			this.channel.awaitMessages((f) => f.author.id === this.playerOne, {
				max: 1,
				time: 60000,
				errors: ['time']
			}).then(async (collected) => {
				const {
					content
				} = collected.first();
				if (content.toLowerCase() === 'a1' && this.board.a1 === null) {
					this.board.a1 = 0;
				} else if (content.toLowerCase() === 'a2' && this.board.a2 === null) {
					this.board.a2 = 0;
				} else if (content.toLowerCase() === 'a3' && this.board.a3 === null) {
					this.board.a3 = 0;
				} else if (content.toLowerCase() === 'b1' && this.board.b1 === null) {
					this.board.b1 = 0;
				} else if (content.toLowerCase() === 'b2' && this.board.b2 === null) {
					this.board.b2 = 0;
				} else if (content.toLowerCase() === 'b3' && this.board.b3 === null) {
					this.board.b3 = 0;
				} else if (content.toLowerCase() === 'c1' && this.board.c1 === null) {
					this.board.c1 = 0;
				} else if (content.toLowerCase() === 'c2' && this.board.c2 === null) {
					this.board.c2 = 0;
				} else if (content.toLowerCase() === 'c3' && this.board.c3 === null) {
					this.board.c3 = 0;
				} else {
					return this.Move(0);
				}
				if (this.checkWin()) {
					this.lastMSG.delete();
					const {stats: {wins: {ttt}}} = await this.client.userDB.findOne({'_id': this.playerOne});
					await this.client.userDB.updateOne({'_id': this.playerOne}, {$set: {'stats.wins.ttt': ttt + 1}});
					this.channel.send({
						content: `<@${this.playerOne}> wins!`,
						embed: {
							title: this.playerTurn === 0 ? `${this.client.users.cache.get(this.playerOne).username} wins!` : `${this.client.users.cache.get(this.playerTwo).username} wins!`,
							description: `${this.board.a1 === null ? '⬛' : this.board.a1 === 0 ? '❌' : '⭕'}${this.board.a2 === null ? '⬛' : this.board.a2 === 0 ? '❌' : '⭕'}${this.board.a3 === null ? '⬛' : this.board.a3 === 0 ? '❌' : '⭕'}\n${this.board.b1 === null ? '⬛' : this.board.b1 === 0 ? '❌' : '⭕'}${this.board.b2 === null ? '⬛' : this.board.b2 === 0 ? '❌' : '⭕'}${this.board.b3 === null ? '⬛' : this.board.b3 === 0 ? '❌' : '⭕'}\n${this.board.c1 === null ? '⬛' : this.board.c1 === 0 ? '❌' : '⭕'}${this.board.c2 === null ? '⬛' : this.board.c2 === 0 ? '❌' : '⭕'}${this.board.c3 === null ? '⬛' : this.board.c3 === 0 ? '❌' : '⭕'}`,
							color: parseInt('877EEB', 16),
							footer: {
								text: `${this.client.users.cache.get(this.playerOne).username} now has ${ttt + 1} wins!`
							}
						}
					});
					nowPlaying.delete(this.playerOne);
				} else if(this.checkDraw()) {
					this.lastMSG.delete();
					nowPlaying.delete(this.playerOne);
					this.channel.send({
						embed: {
							title: 'Draw!',
							description: `${this.board.a1 === null ? '⬛' : this.board.a1 === 0 ? '❌' : '⭕'}${this.board.a2 === null ? '⬛' : this.board.a2 === 0 ? '❌' : '⭕'}${this.board.a3 === null ? '⬛' : this.board.a3 === 0 ? '❌' : '⭕'}\n${this.board.b1 === null ? '⬛' : this.board.b1 === 0 ? '❌' : '⭕'}${this.board.b2 === null ? '⬛' : this.board.b2 === 0 ? '❌' : '⭕'}${this.board.b3 === null ? '⬛' : this.board.b3 === 0 ? '❌' : '⭕'}\n${this.board.c1 === null ? '⬛' : this.board.c1 === 0 ? '❌' : '⭕'}${this.board.c2 === null ? '⬛' : this.board.c2 === 0 ? '❌' : '⭕'}${this.board.c3 === null ? '⬛' : this.board.c3 === 0 ? '❌' : '⭕'}`,
							color: parseInt('877EEB', 16)
						}
					});
				} else if (!this.checkWin()) {
					this.playerTurn = 1;
					this.Move(1);
				}
			}).catch((collected) => {
				console.log(collected);
				this.channel.send(`${this.client.users.cache.get(this.playerOne).username} did not play back in time!`);
				nowPlaying.delete(this.playerOne);
			});
		} else if (playerTurn === 1) {
			this.lastMSG.delete();
			this.lastMSG = await this.channel.send({
				content: `<@${this.playerTwo}>, please select one of the options to play! \`a, b, c\`, \`1, 2, 3\` (Ex. \`a1\`, \`b2\`, or \`c3\`)`,
				embed: {
					title: this.playerTurn === 0 ? `${this.client.users.cache.get(this.playerOne).username}'s turn` : `${this.client.users.cache.get(this.playerTwo).username}'s turn`,
					description: `${this.board.a1 === null ? '⬛' : this.board.a1 === 0 ? '❌' : '⭕'}${this.board.a2 === null ? '⬛' : this.board.a2 === 0 ? '❌' : '⭕'}${this.board.a3 === null ? '⬛' : this.board.a3 === 0 ? '❌' : '⭕'}\n${this.board.b1 === null ? '⬛' : this.board.b1 === 0 ? '❌' : '⭕'}${this.board.b2 === null ? '⬛' : this.board.b2 === 0 ? '❌' : '⭕'}${this.board.b3 === null ? '⬛' : this.board.b3 === 0 ? '❌' : '⭕'}\n${this.board.c1 === null ? '⬛' : this.board.c1 === 0 ? '❌' : '⭕'}${this.board.c2 === null ? '⬛' : this.board.c2 === 0 ? '❌' : '⭕'}${this.board.c3 === null ? '⬛' : this.board.c3 === 0 ? '❌' : '⭕'}`,
					color: parseInt('877EEB', 16)
				}
			});
			this.channel.awaitMessages((f) => f.author.id === this.playerTwo, {
				max: 1,
				time: 60000,
				errors: ['time']
			}).then(async (collected) => {
				const {
					content
				} = collected.first();
				if (content.toLowerCase() === 'a1' && this.board.a1 === null) {
					this.board.a1 = 1;
				} else if (content.toLowerCase() === 'a2' && this.board.a2 === null) {
					this.board.a2 = 1;
				} else if (content.toLowerCase() === 'a3' && this.board.a3 === null) {
					this.board.a3 = 1;
				} else if (content.toLowerCase() === 'b1' && this.board.b1 === null) {
					this.board.b1 = 1;
				} else if (content.toLowerCase() === 'b2' && this.board.b2 === null) {
					this.board.b2 = 1;
				} else if (content.toLowerCase() === 'b3' && this.board.b3 === null) {
					this.board.b3 = 1;
				} else if (content.toLowerCase() === 'c1' && this.board.c1 === null) {
					this.board.c1 = 1;
				} else if (content.toLowerCase() === 'c2' && this.board.c2 === null) {
					this.board.c2 = 1;
				} else if (content.toLowerCase() === 'c3' && this.board.c3 === null) {
					this.board.c3 = 1;
				} else {
					return this.Move(1);
				}
				if (this.checkWin()) {
					const {stats: {wins: {ttt}}} = await this.client.userDB.findOne({'_id': this.playerOne});
					await this.client.userDB.updateOne({'_id': this.playerOne}, {$set: {'stats.wins.ttt': ttt + 1}});
					this.lastMSG.delete();
					this.channel.send({
						content: `<@${this.playerTwo}> wins!`,
						embed: {
							title: this.playerTurn === 0 ? `${this.client.users.cache.get(this.playerOne).username} wins!` : `${this.client.users.cache.get(this.playerTwo).username} wins!`,
							description: `${this.board.a1 === null ? '⬛' : this.board.a1 === 0 ? '❌' : '⭕'}${this.board.a2 === null ? '⬛' : this.board.a2 === 0 ? '❌' : '⭕'}${this.board.a3 === null ? '⬛' : this.board.a3 === 0 ? '❌' : '⭕'}\n${this.board.b1 === null ? '⬛' : this.board.b1 === 0 ? '❌' : '⭕'}${this.board.b2 === null ? '⬛' : this.board.b2 === 0 ? '❌' : '⭕'}${this.board.b3 === null ? '⬛' : this.board.b3 === 0 ? '❌' : '⭕'}\n${this.board.c1 === null ? '⬛' : this.board.c1 === 0 ? '❌' : '⭕'}${this.board.c2 === null ? '⬛' : this.board.c2 === 0 ? '❌' : '⭕'}${this.board.c3 === null ? '⬛' : this.board.c3 === 0 ? '❌' : '⭕'}`,
							color: parseInt('877EEB', 16),
							footer: {
								text: `${this.client.users.cache.get(this.playerOne).username} now has ${ttt + 1} wins!`
							}
						}
					});
					nowPlaying.delete(this.playerOne);
				} else if(this.checkDraw()) {
					nowPlaying.delete(this.playerOne);
					this.lastMSG.delete();
					this.channel.send({
						embed: {
							title: 'Draw!',
							description: `${this.board.a1 === null ? '⬛' : this.board.a1 === 0 ? '❌' : '⭕'}${this.board.a2 === null ? '⬛' : this.board.a2 === 0 ? '❌' : '⭕'}${this.board.a3 === null ? '⬛' : this.board.a3 === 0 ? '❌' : '⭕'}\n${this.board.b1 === null ? '⬛' : this.board.b1 === 0 ? '❌' : '⭕'}${this.board.b2 === null ? '⬛' : this.board.b2 === 0 ? '❌' : '⭕'}${this.board.b3 === null ? '⬛' : this.board.b3 === 0 ? '❌' : '⭕'}\n${this.board.c1 === null ? '⬛' : this.board.c1 === 0 ? '❌' : '⭕'}${this.board.c2 === null ? '⬛' : this.board.c2 === 0 ? '❌' : '⭕'}${this.board.c3 === null ? '⬛' : this.board.c3 === 0 ? '❌' : '⭕'}`,
							color: parseInt('877EEB', 16)
						}
					});
				} else if (!this.checkWin()) {
					this.playerTurn = 0;
					this.Move(0);
				}
			}).catch(() => {
				this.channel.send(`${this.client.users.cache.get(this.playerTwo).username} did not play back in time!`);
				nowPlaying.delete(this.playerOne);
			});
		}
	}
}
module.exports = TTT;   