var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {

	context: __dirname,

	entry: './app/main.js',

	output: {
		path: path.join(__dirname, 'public/build'),
		filename: 'bundle.js'
	},

	plugins: [
		new ExtractTextPlugin('style.css')
	],

	postcss: [
		autoprefixer({
			browsers: ['last 2 versions']
		})
	],

	resolve: {
		extensions: ['', '.js', '.scss', '.css']
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.s?css$/, // Match scss or css
				loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') // Order of these loaders is important
			},
			{
				test: /\.(ttf|eot|svg|woff2?)$/,
				loader: 'file-loader'
			}
		]
	}

};