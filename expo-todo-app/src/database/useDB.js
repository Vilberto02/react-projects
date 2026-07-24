import { useSQLiteContext } from "expo-sqlite";

export function useDB() {
  const database = useSQLiteContext();

  async function findAll() {
    try {
      const query = "SELECT * FROM tasks";
      const result = await database.getAllAsync(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  //search records by text into description
  async function searchByDescription(text) {
    try {
      const query = "SELECT * FROM tasks WHERE description LIKE ?";
      const result = await database.getAllAsync(query, `%${text}%`);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  //create a record
  async function createOne(task) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (description) VALUES ($description)"
    );
    try {
      const result = await statement.executeAsync({
        $description: task.description,
      });
      // const insertedRowId = result.lastInsertRowId.toLocaleString();
      // return { insertedRowId };
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      await statement.finalizeAsync(); //best practice, to finalize prepared statements
    }
  }

  //update record toggling isCompleted state
  async function toggleIsCompleted(id, newState) {
    const query = "UPDATE tasks SET isCompleted = ? WHERE id = ?";
    const result = await database.getFirstAsync(query, !newState, id);
  }

  //delete a record
  async function deleteOne(id) {
    try {
      const result = await database.execAsync(
        `DELETE FROM tasks WHERE id = ${id}`
      );
      // const query = "DELETE FROM tasks WHERE id = ?";
      // const result = await database.getFirstAsync(query, id);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    findAll,
    searchByDescription,
    createOne,
    toggleIsCompleted,
    deleteOne
  };
}
