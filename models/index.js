var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

//function
function urlgenerate(title) {
                    if (title) {
                        // Removes all non-alphanumeric characters from title
                        // And make whitespace underscore
                        console.log('test urlgen title')
                        return title.replace(/\s+/g, '_').replace(/\W/g, '');
                    } else {
                        // Generates random 5 letter string
                        console.log('test urlgen title-else')
                        return Math.random().toString(36).substring(2, 7);
                    }
                }

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
            beforeValidate: (page, options) => {
                page.urlTitle = urlgenerate(page.title);
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