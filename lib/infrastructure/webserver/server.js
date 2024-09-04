'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package');
const Boom = require('@hapi/boom');
const TokenControl = require('../../interfaces/controllers/AuthorizationController');

const createServer = async () => {

    // Create a server with a host and port
    const server = Hapi.server({
        port: process.env.PORT || 4000
    });

    // Register vendors plugins
    await server.register([
        Blipp,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {

                info: {
                    title: 'Test API Documentation',
                    version: Package.version,

                },

            }
        },
        {
            plugin: Good,
            options: {
                ops: {
                    interval: 1000 * 60
                },
                reporters: {
                    myConsoleReporter: [
                        {
                            module: '@hapi/good-squeeze',
                            name: 'Squeeze',
                            args: [{ ops: '*', log: '*', error: '*', response: '*' }]
                        },
                        {
                            module: '@hapi/good-console'
                        },
                        'stdout'
                    ]
                }
            },
        },
    ]);


    // Register custom plugins
    await server.register([
        require('./oauth'),
        require('../../interfaces/routes/users'),
    ]);

    server.events.on('response', function (request) {
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
    });


    server.ext('onRequest', async function (request, h) {
        if (request.headers.authorization === undefined) {
            return h.continue
        }
        else {
            if (await TokenControl.verifyAccessToken(request)) {

                return h.continue
            }
            else {
                return Boom.unauthorized('Bad credentials');
            }
        }
    });

    server.app.serviceLocator = require('../../infrastructure/config/service-locator');

    return server;
};

module.exports = createServer;