'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John ',
          last_name: 'Doe',
          email: 'm@m.com',
          passw_hash: '1234',
          birthday: '2020-10-20',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Test ',
          last_name: 'Testovych',
          email: 'm3@m.com',
          passw_hash: '5015',
          birthday: '2020-10-21',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
