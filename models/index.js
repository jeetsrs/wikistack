var Sequelize = require('sequelize');
var db = new Sequelize('postgres://postgres:postgres123@localhost:5432/wikistack',  {
    dialect: 'postgres'
});

var Page = db.define('page', {
    title: Sequelize.STRING,
    urlTitle: Sequelize.STRING,
    content: Sequelize.TEXT,
    status: Sequelize.ENUM('open', 'closed')
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

module.exports = {
  Page: Page,
  User: User
};
