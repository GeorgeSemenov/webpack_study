const path = require ('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // Внимание, этот плагин работает только с mini-css-extract-plugin  требует наличие mini-css-extract-plugin убирает дублирующиеся importы в scss например в блоке А и в блоке Б есть импорт блока Г, если на страницу подключить блок А и Б то импортируется на страницу только один раз блок Г discards duplicate selectors in the bundled style sheets from mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // чтобы вытащить scss и css код в отдельный фойл а не в style-loader
// const webpack = require('webpack');//Это нужно что бы появилась возможность выделить код webpack из кода js файлов (index.js и blog.js), для этого мы будем использовать метод optimize
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const merge = require('webpack-merge');//Этот модуль нужен чтобы в webpack.config.js склеивать различные модули, вместо object.assign - теперь кажыдй модуль можно записать в другой файл (как pug.js) и подключить к webpack.config.js
// const pug = require ('./webpack/pug');//Подключаем модуль с pug для webpack.config.js ,кстати можно не указывать .js webpack и так всё понимает
// const devserver = require('./webpack/devserver');
// const sass = require('./webpack/sass');//Напомню, что сами стили(допустим blog.scss) нужно подключать через соответствеющие js файлы (blog.js)
// const css = require('./webpack/css');//Модуль для обработки файлов .css напомню что такие файлы нужно подключать особо в каждый соответствующий js файлы (к примеру для index.html нужно подключать в index.js)
// const extractCss = require('./webpack/css.extract');//Модуль для извлечения стилей в отдельный(ые) файл(ы) и дальнейшего подключения к проекту
// const images = require('./webpack/images');//Модуль, который обрабатывает изображения
// const fonts = require('./webpack/fonts');
const CopyWebpackPlugin = require('copy-webpack-plugin');//Данный плюгин позволяет копировать файлы например php файлы, при этом не изменяя пути, потому что это не лоадер, где нужно указывать расжирения обрабатываемх файлов.
const PATHS = {//Объект с двумя свойствами
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

module.exports = {
	mode: "development",
	entry: {
			// 'index': PATHS.source + '/pages/index/index.js',//Обрати внимание для кадой страницы мы создаём свою точку входа которая начинается с .js файла
			'index': path.join(__dirname, 'bomjPacket/index.js'),
		},
	output: {
		filename: '[contenthash].bundle.js',
		path: path.resolve(__dirname,'dist')
	},
	resolve:{//Это объект, который принимает расширения и алиасы
		alias: {
			'@': path.resolve(__dirname,'bomjPacket'),//принцип тот же что и указанно в  строке выше
		}
	},
	optimization:{//название этого объект говорит само за себя.
		splitChunks: {//Разделить чанки 
			chunks: 'all'//все чанки - из всех чанков будет извлечён повторяющийся код и будет добавлен в файлы, в имени которых будет добавлено слово vendor
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(), // Видимо без этого мы не сможем использовать loader, который будем использовать в для обработки scss файлов
		new OptimizeCssAssetsPlugin(), // Внимание, этот плагин работает только с mini-css-extract-plugin оптимизирует scss код, убирает двойные импорты if you put it in optimization.minimizer property, webpack-dev-server won't apply it.
		new HtmlWebpackPlugin({// создаём страничку html
			filename:'index.html',//Задаём имя генерируемому файлу
			// chunks: ['index', 'common'],//Добавляет на страницу только те файлы, которые начинаются с index (допустим index.js index.css даже несмотря на то что они находятся в отельных папках css/ и js/)
			template: 'bomjPacket/index.html'//в данный плагин мы передадим шаблон разметки pug но сразу же скомпилированную (pug-loader'oм), проще говоря плагин сверстает страницу изходя из разметки, которую ему предоставит pug плагин (см он подключени ниже) после обработки этого шаблона
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname,'README.md'),
					to: path.resolve(__dirname,'dist')
				}
			]
		})
	],
	module: {
		rules: [
			// {
			// 	test: /\.scss$/,
			// 	use: ['style-loader','css-loader','sass-loader']
			// },
			{
				test: /\.scss$/,
	      sideEffects: true,
				// use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
				use: ['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
			{//Тут описываем настройки лоадера
				test: /\.pug$/,
				loader:'pug-loader',//настраиваем pug-loader
				options:{
					pretty: true//сделать код компилируемого файла "красивого" раставляем отступы , переносы и т.д.
				}
			}
		]
	}
}