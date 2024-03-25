'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = {
      name: 'BMW',
      size: 'Small',
      rent_per_day: 2500000,
      image_id: 1,
      image_url: 'https://qph.cf2.quoracdn.net/main-qimg-ea51620ee02b28f409a6641db540d6e3-pjlq',
      createdAt: new Date(),
      updatedAt: new Date()
    }  
    const arrData = []
    const n = 10
    for (let i = 0; i < n; i++) {
      arrData.push(data)
    }
    return queryInterface.bulkInsert('Cars', arrData)
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {})
  }
};
