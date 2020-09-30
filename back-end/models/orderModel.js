// const connection = require('./connection');
const connectionPlain = require('./connectionPlain');

const getOrderDetail = async (saleId) =>
  connectionPlain()
    .then((session) =>
      session
        .sql(`
          SELECT sp.sale_id, sp.product_id, sp.quantity, pr.name, pr.price
          FROM Trybeer.sales_products AS sp
          INNER JOIN Trybeer.products AS pr
          ON sp.product_id = pr.id
          WHERE sp.sale_id = ?;
        `)
        .bind(saleId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((products) => products.map(([saleId, productId, quantity, name, price]) => ({ saleId, productId, quantity, name, price })));
// supported by Gustavo Figueiredo, and ckecked this is the only way of using "join" at https://stackoverflow.com/questions/55571181/how-to-use-join-query-in-sql-using-x-devapi-and-nodejs.

module.exports = {
  getOrderDetail,
};
