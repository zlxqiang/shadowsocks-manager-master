const knex = appRequire('init/knex').knex;
const tableName = 'paypal';

const config = appRequire('services/config').all();

//创建paypal表
const createTable = async () => {
  if(config.empty) {
    await knex.schema.dropTableIfExists(tableName);
  }
  const exist = await knex.schema.hasTable(tableName);
  if(exist) {
    return;
  }
  return knex.schema.createTableIfNotExists(tableName, function(table) {
    table.increments('id').primary();
    table.string('orderId').unique();
    table.integer('orderType').defaultTo(3);
    table.string('amount');
    table.integer('user');
    table.integer('account');
    table.string('paypalId').unique();
    table.string('status');
    table.string('paypalData', 4096);
    table.bigInteger('createTime');
    table.bigInteger('expireTime');
  });
};

exports.createTable = createTable;
