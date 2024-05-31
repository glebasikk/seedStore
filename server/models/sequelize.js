const Sequelize = require("sequelize");



const sequelize = new Sequelize("seed", "seed", "4%V3taIKSHYJ", {
    dialect: "mysql",
    host: "pluslousefouf.beget.app",
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
