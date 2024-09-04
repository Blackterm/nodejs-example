'use strict';

module.exports = {
    queryTableFilter(tableName) {
        return `SELECT * FROM ${tableName} where `
    },

    queryTable(tableName) {
        return `SELECT * FROM ${tableName}`
    },

    insertTable(tableName, columName, numberOfColumns) {
        return `INSERT INTO ${tableName} ${columName} VALUES ${numberOfColumns}`
    },

    deleteTable(tableName, id) {
        return `DELETE FROM ${tableName} WHERE id=${id}`
    },

    updateTable(tableName) {
        return `UPDATE ${tableName} set tutorial_title = "Learning Java" where tutorial_id = 4`
    }
};
