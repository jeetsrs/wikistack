var Sequelize = require('sequelize');
const  chalk  =  require('chalk');

var db = new Sequelize('postgres://postgres:postgres123@localhost:5432/wikistack', {
    dialect: 'postgres',
    logging: false
});

//PAGE has 3 parameters - 'page', OBJ and OBJ
var Page = db.define(
    'page', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        urlTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: Sequelize.ENUM('open', 'closed'),
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        getterMethods: {
            route: function () {
                console.log('********Getter Method ', this.urlTitle);
                return '/wiki/' + this.urlTitle;
            }
        }
    });

Page.hook('beforeValidate', function (Abrar, options) {

    if (Abrar.title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        Abrar.urlTitle = Abrar.title.replace(/\s+/g, '_').replace(/\W/g, '');
        console.log(chalk.blue('HOOK Title: ', Abrar.urlTitle));
    } else {
        // Generates random 5 letter string
        Abrar.urlTitle = Math.random().toString(36).substring(2, 7);
        console.log(chalk.blue('Generated Title: ', Abrar.urlTitle));
    }
})

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            is: ["^[a-z]+$", 'i']
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

//Create a "relation" between the two tables.
Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User,
    db: db
};
