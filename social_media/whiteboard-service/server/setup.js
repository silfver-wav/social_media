const Sequelize = require('sequelize');

const sequelize = new Sequelize('imageDB', 'root', 'Pass@123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
    });

const Image = sequelize.define('image', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
    }
})
sequelize.sync({ force: true }).then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating database:', error);
  });

module.exports = {
Image: Image
};