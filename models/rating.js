module.exports = (sequelize, Sequelize) =>{
    return sequelize.define('rating', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        loadNumber: Sequelize.STRING,
        rating: Sequelize.STRING,
        comment: Sequelize.STRING
    }, { freezeTableName: true });
};

