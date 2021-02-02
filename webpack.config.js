const path = require ('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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

const PATHS = {//Объект с двумя свойствами
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

// const common= merge([//модуль merge -  заменяет метод assign т.к. он более наглядный, мы просто передаём массив объектов, которые нужно склеить.
// 	{//Первый объект
// 		mode:'',//Специально не корректно инициализируем параметр mode, т.к. его мы будем инициализировать в последнюю очередь см функцию module.exports
// 		entry: {
// 			'index': PATHS.source + '/pages/index/index.js',//Обрати внимание для кадой страницы мы создаём свою точку входа которая начинается с .js файла
// 		},
// 		output: {
// 			path: PATHS.build,//Устанавливаем путь, куда мы будем пихать наши обработанные файлы
// 			publicPath: '/',//Устанавливаем путь, куда будет смотреть node сервер(да и наверное остальные) в данном случае он будет смотреть в localhost:8080(или другой порт это не важно)  и если ты указал изображение в images он будет смотреть в localhost:8080/images/menu.png а не в css/images/menu.png т.к. menu.png цепляется через menu.scss который складируется в css/ поэтому путь будет относительно css но public path это меняет чтобы webpack смотрел в корень сервера
// 			filename: 'js/[name].js'//[name]  - плэйхолдер, в него будут автоматически подставляться имена точек входа
// 		},
	// 	plugins:[
	// 		new HtmlWebpackPlugin({// создаём страничку html
	// 			filename:'index.html',//Задаём имя генерируемому файлу
	// 			chunks: ['index', 'common'],//Добавляет на страницу только те файлы, которые начинаются с index (допустим index.js index.css даже несмотря на то что они находятся в отельных папках css/ и js/)
	// 			template: PATHS.source + '/pages/index/index.pug'//в данный плагин мы передадим шаблон разметки pug но сразу же скомпилированную (pug-loader'oм), проще говоря плагин сверстает страницу изходя из разметки, которую ему предоставит pug плагин (см он подключени ниже) после обработки этого шаблона
	// 		}),
	// 		new webpack.ProvidePlugin({//Этот плагин позволяет отказаться от import в модулях с кодом, т.е. когда webpack будет смотреть в код и найдёт допустим $ он автоматически подключит jquery, в соотвествии с настройками которые ты установишь в этом модуле
	// 			$: 'jquery',//Если будет найден $ он автоматически подключит jquery, jquery должен быть установленн npm i jquery т.е. можно не писать в коде import jquery
	// 			jQuery: 'jquery'
	// 		})
	// 	],
	// 	optimization:{
	// 		splitChunks:{
	// 			chunks: 'all',//Указывает какие чанки (модули с используемым кодом) будут оптимизироваться (удалятся повторяющийся код и выносится в другой файл), возможные значения 'all'(проверяет все чанки) 'async'(Проверяет только асинхронные) 'initial'
	// 			name: 'common'//Файлы с общим кодом будут называться common.js и common.css, если имя не написать, то там будет vendor~index~blog.js или (css) 
	// 		}
	// 	},
	// 	devtool:'',//этот параметр отвечает за создание source-map их может быть несколько я специально не корректно инициализируем этот параметр , т.к. его мы будем инициализировать в последнюю очередь см функцию module.exports
	// },
	// pug(),//Второй объект, pug(т.к. это объект, то для этого мы используем merge, который у нас инициализирван файлом (см выше в самом начале), в котором есть описание этого плагина
	// images(),
	// fonts()
// ]);

// const developmentConfig ={
// 	devServer: {//Можно легко изменить порт, по которому будет находиться сайт и куча других настроек в пункте dev-server
// 		contentBase:'./build',//Указываем директорию, откуда будет строиться сайт на локальном сервере(по умолчанию сразу по адрессу localhost:8080 будет выводиться index.html), если в этой папке будет, например, blog.html , то эта страница будет доступна по https://localhost/blog.html
// 		hot: true, //Это указание на то что мы используем горячую замену модулей Hot Module Replacement
// 		stats: 'errors-only',//Теперь в косноли будут вылезать только ошибки
// 		port: 9000,//теперича сайт будет открываться на 9000 порту
// 		watchContentBase: true
// 	}
// };

module.exports = {
	mode: "development",
	entry: {
			'index': PATHS.source + '/pages/index/index.js',//Обрати внимание для кадой страницы мы создаём свою точку входа которая начинается с .js файла
		},
	output: {
		filename: '[contenthash]bundle.js',
		path: path.resolve(__dirname,'dist')
	},
	resolve:{//Это объект, который принимает расширения и алиасы
		alias: {
			'@': path.resolve(__dirname,'source'),//принцип тот же что и указанно в  строке выше
		}
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			}
		]
	}
}
// function(env){
	//Напомню что mode:production автоматически минифицирует код.
	// common.mode = env;//Инициализируем режим development или prodaction в объекте common чтобы webpack знал как собирать проект, если эту строку убрать, то консоль выдаст ошибку, т.к. объект common инициализировани не в соотвествии с API webpack'a(т.к. там некорректно инициализирован ключ mode)
	// if (env === 'production'){// env - параметр который передаётся в npm scripts - загляни в package.jsone
	// 	common.devtool = false;//сорсмап создаваться не будет
	// 	return merge([
	// 		common,
	// 		extractCss(),//Отделяем файлы стилей в продакшене, хотя ничто не мешает это делать в common(т.е. всегда), напоминаю этот модуль заменяет собой style-loader, т.е. теперь стили не будут писаться инлайно в html файле, а будут вынесены в отдельный файлик.
	// 	])
	// }
	// if (env === 'development'){
	// 	//return Object.assign(//Метод assign нужен чтобы склеивать объекты. Он принимает три аргумента
	// 		//{},//Первый аргумент assign должен быть пустым объектом, как я понимаю туда будут записываться два других объекта.
	// 	common.devtool = 'eveal-sourcemap';//Будет создаваться сорсмап
	// 	return merge([//модуль merge -  заменяет метод assign см выше в комменатриях , т.к. он более наглядный, мы просто передаём массив объектов, которые нужно склеить.
	// 		common,//Второй и третий аргументы - объекты которые должны быть склеены
	// 		devserver(),//Подключаем модуль devserver, который у нас инициализирван файлом (см выше в самом начале), в котором есть описание этого плагина
	// 		sass(),
	// 		css()
	// 	])
	// }
// };