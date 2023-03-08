import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todos/addAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const newTodo = {
        id: new Date().getTime(),
        title: payload.title,
        completed: false,
      };
      const response = await axios.post("http://localhost:3001/todos", newTodo);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todos/toggleAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/todos/${payload.id}`,
        { title: payload.title, completed: payload.completed }
      );
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const initialState = {
  todos: [],
  error: null,
  loading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: new Date().getTime(),
        title: action.payload.title,
        completed: false,
      };

      state.todos.push(newTodo);
    },
    toggleTodos: (state, action) => {
      const selectedTodo = state.todos.find((t) => t.id === action.payload.id);
      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTodo: (state, action) => {
      const filteredTodos = state.todos.filter(
        (t) => t.id !== action.payload.id
      );
      state.todos = filteredTodos;
    },
  },
  extraReducers: {
    [getAsyncTodos.fulfilled]: (state, action) => {
      return { ...state, todos: action.payload, error: null, loading: false };
    },
    [getAsyncTodos.pending]: (state, action) => {
      return { ...state, todos: [], error: null, loading: true };
    },
    [getAsyncTodos.rejected]: (state, action) => {
      return { ...state, todos: [], error: action.payload, loading: false };
    },
    [addAsyncTodos.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [toggleAsyncTodos.fulfilled]: (state, action) => {
      const selectedTodo = state.todos.find((t) => t.id === action.payload.id);
      selectedTodo.completed = action.payload.completed;
    },
  },
});

export const { addTodo, toggleTodos, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
