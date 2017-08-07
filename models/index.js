var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: true
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
    {
        getterMethods: {
            route() {
                return '/wiki/' + this.urlTitle
            }
        },
        hooks: {
            beforeValidate: (user, options) => {
                user.mood = 'happy';
            },
            afterValidate: (user, options) => {
                user.username = 'Toni';
            }
        }
    }

);

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
};