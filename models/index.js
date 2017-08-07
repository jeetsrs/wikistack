var Sequelize = require('sequelize');
const chalk = require('chalk');

var db = new Sequelize('postgres://postgres:postgres123@localhost:5432/wikistack',  {
    dialect: 'postgres',
    logging: false
});

//PAGE has 3 parameters - 'page', OBJ and OBJ
var Page = db.define(
    'page',
    {
        title: {type: Sequelize.STRING, allowNull: false},
        urlTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {type: Sequelize.TEXT, allowNull: false},
        status: Sequelize.ENUM('open', 'closed'),
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        getterMethods: {
            route: function() {
                console.log('********Getter Method ', this.urlTitle);
                return '/wiki/' + this.urlTitle;
            }
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$",'i']
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page
  .create({ title: 'Title Test Page', urlTitle: 'TestPage', content: 'hello world, you are fantastic', status: 'open'})
  .then(console.log(chalk.blue('Page.create called')));

//   xyz => {
//       //'urlTitle'
//     console.log('*******Calling route ', xyz.getterMethods.route());
//   }

module.exports = {
  Page: Page,
  User: User,
  db: db
};
