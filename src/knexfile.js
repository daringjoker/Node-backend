// Update with your config settings.

const defaultConfig={
  client:'sqlite3',
  connection:{
    filename: './dev.sqlite3'
  }
}

if(process.env.NODE_ENV==="production")
{
  defaultConfig={
    connection :{
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8',
      timezone: 'UTC'
    },
    client:process.env.DB_CLIENT
  }
}

module.exports = {
    client:defaultConfig.client,
    connection:defaultConfig.connection,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      stub:'./stubs/table_create.stub'
    },
    seeds:{
      directory:"./seeds",
      stub:"./stubs/add_items.stub"
    }
};
