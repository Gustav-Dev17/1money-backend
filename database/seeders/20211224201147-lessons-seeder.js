'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lessons', [{
      name: 'Entendendo o Bitcoin',
      sequence: 1,
      duration: 5.5,
      video: 's3/admin_uploads/courses/course_name_prevido.mp4',
      resource: 's3/admin_uploads/courses/atividade.zip',
      course_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lessons', null, {});
  }
};