'use strict';

module.exports = class {

    constructor(id = null, name, lastName, email, password) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

};