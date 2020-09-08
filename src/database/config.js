const ENV = process.env.NODE_ENV || 'dev';

const isDevelopment = ENV == 'dev'

module.exports = {
    dialect: 'mysql',
    host: isDevelopment ? 'localhost' : '',
    username: 'root',
    password: isDevelopment ? 'ma181199@' : '',
    database: 'hister',
    define: {
        timestamps: true,
        underscored: true
    }
}