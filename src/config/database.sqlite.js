import Database from 'better-sqlite3';

const database = new Database('api.db');
database.pragma('foreign_keys = ON')

export default database;