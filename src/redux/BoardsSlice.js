import { createSlice } from "@reduxjs/toolkit";
import data from'../data.json';

const BoardsSlice = createSlice({
    name: "boards",
    initialState: data.boards,
    reducers: {
        addBoard: (state, action) => {
            const payload = action.payload;
            const board = {
                name: payload.name,
                columns: [],
            };
            board.columns = payload.newColumns;
            state.push(board);
        },
        editBoard: (state, action) => {
            const payload = action.payload;
            const activeBoard = state[payload.index];
            activeBoard.name = payload.name;
            activeBoard.columns = payload.newColumns;
        },
        addTask: (state, action) => {
            const payload = action.payload;
            const activeBoard = state[payload.boardIndex];
            const activeColumn = activeBoard.columns[payload.columnIndex]; 
            const activeTasks = activeColumn.tasks;
            
            const task = {
                title: payload.title,
                description: payload.description,
                status: payload.status,
                subtasks: [],
            };

            task.subtasks = payload.newSubtasks;
            activeTasks.push(task);
        },
        editTask: (state, action) => {
            const payload = action.payload;
            const activeBoard = state[payload.boardIndex];
            const activeColumn = activeBoard.columns[payload.columnIndex];
            const activeTasks = activeColumn.tasks;
            const activeTask = activeTasks[payload.taskIndex];

            activeTask.title = payload.title;
            activeTask.description = payload.description;
            activeTask.status = payload.status;
            activeTask.subtasks = payload.subtasks;
        },
        setSubtaskIsCompleted: (state, action) => {
            const payload = action.payload;
            const activeBoard = state[payload.boardIndex];
            const activeColumn = activeBoard.columns[payload.columnIndex];
            const activeTasks = activeColumn.tasks;
            const activeTask = activeTasks[payload.taskIndex];
            const activeSubtasks = activeTask.subtasks;
            const activeSubtask = activeSubtasks[payload.subtaskIndex];

            activeSubtask.isCompleted = payload.isCompleted;
        },
        setTaskStatus: (state, action) => {
            const payload = action.payload;
            const activeBoard = state[payload.boardIndex];
            const activeColumn = activeBoard.columns[payload.columnIndex];
            const activeTasks = activeColumn.tasks;
            const activeTask = activeTasks[payload.taskIndex];

            activeTasks.splice(payload.taskIndex, 1);

            const newActiveColumn = activeBoard.columns[payload.statusIndex];

            activeTask.status = newActiveColumn.name;

            newActiveColumn.tasks.push(activeTask);
        } 
    },
});

export default BoardsSlice;
 