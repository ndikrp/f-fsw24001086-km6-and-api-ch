'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = {
      name: 'BMW',
      size: 'Small',
      rent_per_day: 2500000,
      image_id: 1,
      image_url: 'https://res.cloudinary.com/dgjwtquka/image/upload/v1664959593/phqnlmh3b7ocuwtdpfvi.jpg',
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
