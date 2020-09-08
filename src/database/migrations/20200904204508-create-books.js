'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      bookID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      authors: {
        type: Sequelize.STRING,
        allowNull: false
      },
      average_rating: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn13: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      language_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_pages: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ratings_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      text_reviews_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      publication_date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('books')
  }
};
