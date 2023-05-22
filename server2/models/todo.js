const neo4j = require("../config/neo4j");

class Todo {
  static async create(text) {
    const session = neo4j.session();

    try {
      const result = await session.run(
        "CREATE (todo:Todo {text: $text}) RETURN todo",
        { text }
      );
      const createdTodo = result.records[0].get("todo");
      return createdTodo;
    } finally {
      session.close();
    }
  }

  static async getAll() {
    const session = neo4j.session();

    try {
      const result = await session.run("MATCH (todo:Todo) RETURN todo");
      const todos = result.records.map((record) => record.get("todo"));
      return todos;
    } finally {
      session.close();
    }
  }

  static async getById(id) {
    const session = neo4j.session();

    try {
      const result = await session.run(
        "MATCH (todo:Todo) WHERE ID(todo) = $id RETURN todo",
        { id }
      );
      const todo = result.records[0].get("todo");
      return todo;
    } finally {
      session.close();
    }
  }

  static async update(id, text) {
    const session = neo4j.session();

    try {
      const result = await session.run(
        "MATCH (todo:Todo) WHERE ID(todo) = $id SET todo.text = $text RETURN todo",
        { id, text }
      );
      const updatedTodo = result.records[0].get("todo");
      return updatedTodo;
    } finally {
      session.close();
    }
  }

  static async delete(id) {
    const session = neo4j.session();

    try {
      await session.run("MATCH (todo:Todo) WHERE ID(todo) = $id DELETE todo", {
        id,
      });
    } finally {
      session.close();
    }
  }
}

module.exports = Todo;
