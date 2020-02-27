const postgres = require('pg');
const Sequelize = require('sequelize');
const RatingModel = require('./models/rating');
const CompanyModel = require('./models/company');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');


const sequelize = new Sequelize(process.env.DATABASE_URL);


const User = UserModel(sequelize, Sequelize);
const Rating = RatingModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);


User.hasMany(Rating);
Rating.belongsTo(User);
Rating.belongsTo(Company);
Company.hasMany(Rating);
User.belongsTo(Role);

sequelize.sync() //{force: true} <-- Use this to force create new tables
.then(() => console.log('The Tables are created!'))
.then(() => {
    return Role.bulkCreate ([
        { id: 0, name: 'Blocked' },
        { id: 1, name: 'User' },
        { id: 2, name: 'Admin' },
    ], { updateOnDuplicate: ['name'] })
})

module.exports = {
    Company,
    Rating,
    User,
    Role
}

