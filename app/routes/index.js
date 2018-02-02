// routes/index.js

const expenseRoutes = require('./expense_routes');

module.exports = function(app, connection) {
  expenseRoutes(app, connection);
  // Other route groups could go here, in the future
};
