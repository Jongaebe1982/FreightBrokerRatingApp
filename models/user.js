const passportLocalSequelize = require("passport-local-sequelize");

module.exports = (sequelize, Sequelize) => {
  let User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: Sequelize.STRING,
      hash: Sequelize.TEXT,
      salt: Sequelize.TEXT,
      roleId: {
        type: Sequelize.INTEGER,
        defaultValue: 2
      }
    },
    {
      getterMethods: {
        isAdmin() {
          return this.roleId === 2;
        }
      },
      freezeTableName: true
    }
  );

  passportLocalSequelize.attachToUser(User, {
    usernameField: "username",
    hash: "hash",
    saltField: "salt"
  });
  return User;
};
