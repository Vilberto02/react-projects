import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Todo from './Todo';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from './AppHeader';
import AddTodo from './AddTodo';
import { useDB } from '../database/useDB';

const TodoList = () => {
  const db = useDB();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  const addTodo = async () => {
    if (text.trim()) {
      await db.createOne({ description: text });
      setText('');
      await list();
    }
  };

  const deleteTodo = async (id) => {
    try {
      await db.deleteOne(id);
      list();
    } catch (error) {
      console.error(error);
    }
  };

  const toogleIsCompleted = async (id, state) => {
    try {
      await db.toggleIsCompleted(id, state);
      list();
    } catch (error) {
      console.error(error);
    }
  };

  const list = async () => {
    try {
      const results = await db.findAll();
      setTodos(results);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTodos = todos.filter(todo => todo.description.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    list();
  }, []);

  return (
    <LinearGradient
      colors={['#dadde4', '#c0d3fd', '#76a9d5', '#512da8']}
      style={styles.fullWidth}>
      <AppHeader />
      <View style={{ flex: 1, padding: 16 }}>
        <AddTodo text={text} query={query} setText={setText} addTodo={addTodo} setQuery={setQuery} />
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <Todo {...item} deleteTodo={deleteTodo} toggleIsCompleted={toogleIsCompleted}>{item.description}</Todo>
          }
        />
      </View>
    </LinearGradient >
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
  },
});

export default TodoList;
