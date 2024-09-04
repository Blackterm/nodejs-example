'use strict';

const constants = require('./constants');
const environment = require('./environment');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');

function buildBeans() {

    const beans = {
        accessTokenManager: new JwtAccessTokenManager(),
        userSerializer: new UserSerializer(),
    };

    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MYSQL) {
        const UserRepositoryMongo = require('../repositories/UserRepositoryMysql');
        beans.userRepository = new UserRepositoryMongo();
    }

    return beans;
}

module.exports = buildBeans();
