import { configureStore, createSlice } from "@reduxjs/toolkit";
import type Task from "@/interfaces/task";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Task[]>) => action.payload,
    add: (state) => {
      const lastTask = state[state.length - 1];
      lastTask.isGhost = false;
      const start = lastTask ? lastTask.end : { h: "0", m: "00", i: true };
      let end;
      const newHour = Number(start.h) + 1;
      if (newHour < 13) {
        end = { ...start, h: String(newHour) };
      } else end = { ...start, h: "1", i: !start.i };
      const newTask = {
        text: "type to add task",
        start: start,
        end: end,
        id: Math.ceil(Math.random() * 10000),
        isGhost: true,
      };
      state.push(newTask);

      if (lastTask) {
        fetch("/api", {
          method: "POST",
          body: JSON.stringify({ action: "REPLACE", task: lastTask, id: lastTask.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      fetch("/api", {
        method: "POST",
        body: JSON.stringify({ action: "ADD", task: newTask }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    remove: (state, action: PayloadAction<Number>) => {
      state = state.filter((task) => task.id !== action.payload);
    },
    replace: (state, action: PayloadAction<Task>) => {
      state = state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      fetch("/api", {
        method: "POST",
        body: JSON.stringify({ action: "REPLACE", task: action.payload, id: action.payload.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
});

const store = configureStore({ reducer: taskSlice.reducer });

export const taskActions = taskSlice.actions;

export default store;
