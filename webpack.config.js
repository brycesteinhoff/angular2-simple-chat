module.exports = {

	context: __dirname,

	entry: './js/index.js',

	output: {
		path: __dirname,
		filename: 'public/build/bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			}
		]
	}

};