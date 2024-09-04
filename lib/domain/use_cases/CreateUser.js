'use strict';
const Boom = require('@hapi/boom');


module.exports = async (name, lastName, email, password, birthDate, gender, { userRepository }) => {
    var res = await userRepository.createUser(name, lastName, email, password, birthDate, gender);
    if (res.serverStatus === 2) {
        return {
            'res': 'Başarılı'
        }
    } else {
        return Boom.unauthorized('Kullanıcı bulunamadı');
    }
};
