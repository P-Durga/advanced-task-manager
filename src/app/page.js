'use client';

import { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import { Plus, Search, Calendar } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useTheme } from '@/context/ThemeContext';
import { useNotification } from '@/context/NotificationContext';
import { tasksReducer } from '@/reducers/tasksReducer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorAlert } from '@/components/ErrorAlert';
import { LoadingState } from '@/components/LoadingState';
import { Header } from '@/components/Layout/Header';
import { Notifications } from '@/components/Layout/Notifications';
import { Statistics } from '@/components/Statistics/Statistics';
import { TaskItem } from '@/components/Task/TaskItem';
import { TaskForm } from '@/components/Task/TaskForm';
import { Modal } from '@/components/Modal/Modal';
import { ModalHeader } from '@/components/Modal/ModalHeader';
import { ModalBody } from '@/components/Modal/ModalBody';

export default function Home() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const { theme } = useTheme();
  const { addNotification } = useNotification();
  const { error, handleAsyncError, clearError } = useErrorHandler();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Initialize with sample tasks with error handling
  useEffect(() => {
    const initializeTasks = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const sampleTasks = [
          { 
            id: '1', 
            title: 'Complete project documentation', 
            description: 'Write comprehensive docs', 
            priority: 'high', 
            category: 'work', 
            completed: false 
          },
          { 
            id: '2', 
            title: 'Review pull requests', 
            description: 'Check team PRs', 
            priority: 'medium', 
            category: 'work', 
            completed: false 
          },
          { 
            id: '3', 
            title: 'Grocery shopping', 
            description: 'Buy weekly groceries', 
            priority: 'low', 
            category: 'shopping', 
            completed: true 
          },
          { 
            id: '4', 
            title: 'Gym workout', 
            description: '1 hour cardio', 
            priority: 'medium', 
            category: 'health', 
            completed: false 
          },
        ];

        dispatch({ type: 'SET_TASKS', payload: sampleTasks });
      } catch (err) {
        await handleAsyncError(
          Promise.reject(err), 
          'Failed to load tasks'
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeTasks();
  }, [handleAsyncError]);

  const filteredTasks = useMemo(() => {
    try {
      return tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                             task.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
        return matchesSearch && matchesPriority && matchesCategory;
      });
    } catch (err) {
      console.error('Error filtering tasks:', err);
      return tasks;
    }
  }, [tasks, debouncedSearch, filterPriority, filterCategory]);

  const handleAddTask = useCallback(async (formData) => {
    const { data, error } = await handleAsyncError(
      new Promise((resolve, reject) => {
        try {
          const newTask = {
            id: Date.now().toString(),
            ...formData,
            completed: false,
            createdAt: new Date().toISOString(),
          };
          
          dispatch({ type: 'ADD_TASK', payload: newTask });
          resolve(newTask);
        } catch (err) {
          reject(err);
        }
      }),
      'Adding task'
    );

    if (!error) {
      setIsModalOpen(false);
      addNotification('Task added successfully!');
    }
  }, [handleAsyncError, addNotification]);

  const handleUpdateTask = useCallback(async (formData) => {
    const { data, error } = await handleAsyncError(
      new Promise((resolve, reject) => {
        try {
          if (!editingTask) {
            throw new Error('No task selected for editing');
          }
          
          dispatch({ 
            type: 'UPDATE_TASK', 
            payload: { 
              id: editingTask.id, 
              updates: {
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            }
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
      'Updating task'
    );

    if (!error) {
      setIsModalOpen(false);
      setEditingTask(null);
      addNotification('Task updated successfully!');
    }
  }, [editingTask, handleAsyncError, addNotification]);

  const handleDeleteTask = useCallback(async (id) => {
    // Confirmation dialog
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    const { error } = await handleAsyncError(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: 'DELETE_TASK', payload: id });
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
      'Deleting task'
    );

    if (!error) {
      addNotification('Task deleted successfully!');
    }
  }, [handleAsyncError, addNotification]);

  const handleToggleTask = useCallback(async (id) => {
    const { error } = await handleAsyncError(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: 'TOGGLE_TASK', payload: id });
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
      'Toggling task'
    );

    if (error) {
      console.error('Failed to toggle task:', error);
    }
  }, [handleAsyncError]);

  const handleEditTask = useCallback((task) => {
    try {
      if (!task || !task.id) {
        throw new Error('Invalid task data');
      }
      setEditingTask(task);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error editing task:', err);
      addNotification('Failed to open task for editing');
    }
  }, [addNotification]);

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
          <LoadingState message="Loading your tasks..." />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <Header />
        <Notifications />
        
        {error && (
          <ErrorAlert error={error} onDismiss={clearError} />
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Statistics tasks={tasks} />

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Task
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchQuery || filterPriority !== 'all' || filterCategory !== 'all'
                    ? 'No tasks match your filters'
                    : 'No tasks found. Create your first task!'}
                </p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))
            )}
          </div>
        </main>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader onClose={() => setIsModalOpen(false)}>
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </ModalHeader>
          <ModalBody>
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              onCancel={() => setIsModalOpen(false)}
            />
          </ModalBody>
        </Modal>
      </div>
    </ErrorBoundary>
  );
} 