import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    currentId: 4,
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        // 1뎁슨데 어떻게 wjrl currentId를 찾지 흠
        id: state.currentId++,
        // 밥먹기 같은 행동이 들어감
        text: action.payload.trim(),
        state: "todo",
      });
    },
    updateTodo: (state, action) => {
      const itemIndex = state.todos.findIndex(
        (item) => item.id === action.payload
      );
      state.todos[itemIndex].state =
        state.todos[itemIndex].state === "todo" ? "done" : "todo";
      state.todos.push(state.todos.splice(itemIndex, 1)[0]);
    },
    deleteTodo: (state, action) => {
      const itemIndex = state.todos.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex > -1) {
        state.todos.splice(itemIndex, 1);
      }
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
