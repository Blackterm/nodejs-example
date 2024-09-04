'use strict';
const Boom = require('@hapi/boom');
const ListUsers = require('../../domain/use_cases/GetUserList');
const UserLogin = require('../../domain/use_cases/GetAccessToken');
const CreateUser = require('../../domain/use_cases/CreateUser');
const UserProfile = require('../../domain/use_cases/GetUserProfile');
module.exports = {


    async getUserList(request, h) {

        const serviceLocator = request.server.app.serviceLocator;

        const userProfile = await UserProfile('300-1', serviceLocator);

        try {
            return h.file(userProfile)

        } catch (err) {
            return Boom.unauthorized('Bad credentials');
        }
    },

    async getUserName(request, h) {
        const serviceLocator = request.server.app.serviceLocator;
        // Input
        const name = await request.params.name;
        // Treatment
        return 'okey';
    },


    async loginUser(request, h) {
        // Context
        const serviceLocator = request.server.app.serviceLocator;
        const email = request.payload['email'];
        const password = request.payload['password'];

        if (!email || !password) {

            if (!email && !password) {
                return Boom.badData('Email and password is required');
            }
            else if (!password) {
                return Boom.badData('Password is required');
            }
            else {
                return Boom.badData('Email is required');
            }
        }


        // Treatment
        try {
            return UserLogin(email, password, serviceLocator)
        } catch (err) {
            return Boom.unauthorized('Bad credentials');
        }
    },


    async createUser(request, h) {
        // Context
        const serviceLocator = request.server.app.serviceLocator;

        // Input
        const name = request.payload['name'];
        const lastName = request.payload['lastName'];
        const email = request.payload['email'];
        const password = request.payload['password'];
        const birthDate = request.payload['birthDate'];
        const gender = request.payload['gender'];

        if (!name || !lastName || !email || !password || !birthDate || !gender) {

            if (!name) {
                return Boom.badData('Name is required');
            }
            else if (!lastName) {
                return Boom.badData('Last Name is required');
            }
            else if (!email) {
                return Boom.badData('Mail is required');
            }
            else if (!password) {
                return Boom.badData('Password is required');
            }
            else if (!birthDate) {
                return Boom.badData('BirthDate is required');
            }
            else {
                return Boom.badData('Gender is required');
            }

        }

        // Treatment
        try {
            return CreateUser(name, lastName, email, password, birthDate, gender, serviceLocator)
        } catch (err) {
            return Boom.unauthorized('Bad credentials');
        }
    },


};
