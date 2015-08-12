var npm_dir = __dirname + '/node_modules';

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        // this.module.noParse.push(new RegExp(path));
    },
    entry: './src/index.jsx',
    output: {
        // path: './build',
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: 'http://localhost:8090/build'
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "react": npm_dir + '/react',
            "react/addons": npm_dir + '/react/addons'
        }
    }
};

config.addVendor('react', npm_dir + '/react');
config.addVendor('react/addons', npm_dir + '/react/addons');

module.exports = config;
