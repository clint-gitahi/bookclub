'use strict';

module.exports = function (sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Book.associate = function (models) {// associations can be defined here
  };

  return Book;
};
//# sourceMappingURL=book.js.map