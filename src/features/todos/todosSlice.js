import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: new Date().getTime(),
        title: action.payload.title,
        isCompleted: false,
      };

      state.todos.push(newTodo);
    },
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
