class Daily extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'daily',
			aliases: ['dailycoins'],
			usage: '{c}',
			botPerms: ['EMBED_LINKS'],
			category: 'currency'
		});
		this.callback = async ({
			message
		}) => {
			const member = message.member;
			const {
				currency: {
					lastUsed,
					wallet,
					streak
				}
			} = await this.client.userDB.findOne({
				'_id': member.id
			});
			var userStreak = streak;
			if (lastUsed == null || message.createdTimestamp - lastUsed >= 86400000) {
				if (message.createdTimestamp - lastUsed <= (86400000) + (86400000 / 2)) {
					userStreak++;
				} else {
					userStreak = 0;
				}

				await this.client.userDB.updateOne({
					'_id': member.id
				}, {
					$set: {
						'currency.lastUsed': message.createdTimestamp,
						'currency.streak': userStreak,
						'currency.wallet': wallet + Math.floor(500 + (500 * (userStreak / 7)))
					}
				});
				return {
					embed: {
						author: {
							name: `You claimed your ${Math.floor(500 + (500 * (userStreak / 7)))} coins`,
							icon_url: member.user.displayAvatarURL()
						},
						footer: {
							text: `You have a streak of ${userStreak} ${userStreak == 1 ? 'day' : 'days'}!`
						},
						color: parseInt('877EEB', 16),
					}
				};
			} else {
				return {
					embed: {
						color: parseInt('877EEB', 16),
						author: {
							name: 'You can\'t use that yet!',
							icon_url: member.user.displayAvatarURL()
						}
					}
				};
			}
		};
	}
}

module.exports = Daily;