'use strict';

const jwt = require('jsonwebtoken');
const AccessTokenManager = require('../../application/security/AccessTokenManager');
const connection = require('../../infrastructure/orm/mysql/mysql');
const UID = require('../../application/uid/Uid');
module.exports = class extends AccessTokenManager {

    async generate(payload) {
        const uid = UID.uid()
        var token = jwt.sign({
            data: {
                'id': payload
            }
        }, uid, {

            expiresIn: '2h'
        }, { algorithm: 'ES512' })
        var time = jwt.decode(token)
        let sqlQuery = `INSERT INTO LoginToken(token, expiresIn)VALUES(?,?)`
        var res = await connection.query(sqlQuery, [token, time.exp]).spread((response) => response);
        if (res.serverStatus === 2) {
            return {

                'message': "success",
                'token': token
            }
        } else {
            throw new Error('Error creating')
        }
    }

    async decode(accessToken) {
        let sqlQuery = `SELECT * From LoginToken where token= ?`
        var res = await connection.query(sqlQuery, [accessToken]).spread((response) => response);
        if (res.length !== 0) {
            if (res[0].token === accessToken) {
                var token = jwt.decode(accessToken)
                if (Date.now() >= token.exp * 1000) {
                    return false;
                }
                else {
                    return true;
                }

            } else {
                return false;
            }
        }

    }

};