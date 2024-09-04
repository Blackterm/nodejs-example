'use strict';


module.exports = class {

    getUserList() {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getUserFirstName(name) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    userLogin(email, password) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    createUser(name, lastName, email, password, birthDate, gender) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    createProduct() {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getUserProfile(fileNo) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

};
