const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CRUD operations

// Create a task
app.post('/tasks', (req, res) => {
    const { title, description, priority, status, due_date } = req.body;
    db.run("INSERT INTO tasks (title, description, priority, status, due_date) VALUES (?, ?, ?, ?, ?)", [title, description, priority, status, due_date], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

// Update a task
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;
    db.run("UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, due_date = ? WHERE id = ?", [title, description, priority, status, due_date, id], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send("Task updated successfully");
    });
});

// Insights endpoint
app.get('/insights', (req, res) => {
    db.all("SELECT priority, COUNT(*) as count FROM tasks GROUP BY priority", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
