'use strict';

const connection = require('../../infrastructure/orm/mysql/mysql');
const UserRepository = require('../../domain/repository/UserRepository');
const UID = require('../../application/uid/Uid');
const faker = require('@faker-js/faker');
const query = require('../../application/enums/DatabaseEnum')

module.exports = class extends UserRepository {

    async userLogin(email, password) {
        var res = await connection.query(query.queryTableFilter('Users') + `email= ? and password= ?`, [email, password]).spread((response) => response);
        if (res.length === 1) {
            const resData = {
                "uid": res[0].uid,
                "name": res[0].name,
                "lastName": res[0].lastName,
            }
            return resData
        } else {
            return null;
        }

    }

    async createUser(name, lastName, email, password, birthDate, gender) {
        const uid = UID.uid()
        return connection.query(query.insertTable('Users', '(name, lastName, email, password, birthDate, gender,uid)', '(?,?,?,?,?,?,?)'), [name, lastName, email, password, birthDate, gender, uid]).spread((response) => response);
    }

    async getUserList() {
        return connection.query(query.queryTable('Users')).spread((response) => response);
    }

    async getUserProfile(fileNo) {
        return __dirname + `/images/${fileNo}.jpg`
    }


    async getUserFirstName(res) {
        return `Hello ${res}!`;
    }

    async createProduct() {
        var product = {
            'name': faker.faker.commerce.productName(),
            'price': faker.faker.commerce.price(),
            'stock': Math.floor(Math.random() * 300),
            'type': faker.faker.commerce.productAdjective(),
            'uid': faker.faker.datatype.uuid(),
        }
        try {
            await connection.query(query.insertTable('Urunler', '(name, price, stock, type, uid)', '(?,?,?,?,?)'), [product.name, product.price, product.stock, product.type, product.uid]).spread((response) => response);

        } catch (error) {
            throw new Error(error)
        }
    }

};

