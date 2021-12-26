'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [{
      id: 1,
      name: 'Entendendo o Bitcoin',
      description: 'Aprenda sobre o que é o Bitcoin',
      sequence: 1,
      price: 99.90,
      cover: 's3/admin_uploads/courses/course_name_cover.jpg',
      prevideo: 's3/admin_uploads/courses/course_name_prevido.mp4',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};