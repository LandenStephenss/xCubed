class Beautiful extends require('../../../Assets/Structures/Commands/GenericImageAPICommand') {
	constructor(client) {
		super(client, {
			name: 'beautiful',
			usage: '{c} `<user>`',
			description: 'Oh this?',
			category: 'fun',
			endpoint: '/beautiful'
		});
	}
}

module.exports = Beautiful;