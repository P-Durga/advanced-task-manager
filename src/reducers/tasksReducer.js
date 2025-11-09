export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    
    case 'UPDATE_TASK':
      return state.map(task => 
        task.id === action.payload.id 
          ? { ...task, ...action.payload.updates } 
          : task
      );
    
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload 
          ? { ...task, completed: !task.completed } 
          : task
      );
    
    case 'SET_TASKS':
      return action.payload;
    
    default:
      return state;
  }
};