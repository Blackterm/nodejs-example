'use strict';

const UsersController = require('../controllers/UsersController');

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/users',
                handler: UsersController.getUserList,
                options: {
                    description: 'List all users',
                    tags: 'auth',

                },
            },
            {
                method: 'GET',
                path: '/user/{name}',
                handler: UsersController.getUserName,
                options: {
                    description: 'List all user',
                    tags: 'auth',

                },
            },
            {
                method: 'POST',
                path: '/api/v2/auth/login',
                handler: UsersController.loginUser,
                options: {
                    description: 'Login user',
                    tags: 'api',
                },

            },
            {
                method: 'POST',
                path: '/create_user',
                handler: UsersController.createUser,
                options: {
                    description: 'Create user',
                    tags: 'api',
                },
            },
        ]);

    }
};