import express from "express";
import cors from 'cors';
import webpack from 'webpack';
import middleware from "webpack-dev-middleware";
import webpackConfig from '../../webpack.dev'
import ejs from 'ejs';

const server = express();

server.use(cors());
server.set('view engine', 'ejs');
server.set('views', 'public');
server.use(express.static(__dirname + '/public'));

if (process.env.DEV) {
    // Load the webpack-dev-middleware
    // @ts-ignore
    const compiler = webpack(webpackConfig);
    server.use(middleware(compiler));
}

server.get('*', (req, res) => {
    res.render('index');
});

server.listen(process.env.PORT || 3000, () => console.log('GHDB Listening on port:', process.env.PORT || 3000));