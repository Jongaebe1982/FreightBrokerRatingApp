module.exports = (sequelize, Sequelize) =>{
    return sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
        companyName: Sequelize.STRING
    }, { freezeTableName: true });
};