'use strict';
const Boom = require('@hapi/boom');


module.exports = async (email, password, { userRepository, accessTokenManager }) => {

    var user = await userRepository.userLogin(email, password);

    if (user !== null) {
        var res = await accessTokenManager.generate(user.uid);
        return res
    } else {
        return Boom.unauthorized('Kullanıcı Adı veya Şifreniz Yanlış');
    }


};
