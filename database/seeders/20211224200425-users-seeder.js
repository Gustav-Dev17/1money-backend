'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      usertype: 'U',
      name: 'John Snow',
      email: 'example@example.com',
      password: '12345678',
      picture: 's3/user_uploads/profile_pic.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};