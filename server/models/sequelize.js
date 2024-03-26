const Sequelize = require("sequelize");



const sequelize = new Sequelize("seed", "root", "12345", {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    define: {
        timestamps: false,
    },
    
});

sequelize
    .authenticate()
    .then(() => console.log('Connected.'))
    .catch((err) =>
        console.error('Connection error: ', err)
    );


module.exports = sequelize;
