const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity

db.serialize(() => {
    db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, priority TEXT, status TEXT, due_date TEXT)");
});

module.exports = db;
