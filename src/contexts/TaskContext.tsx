import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

interface TaskStats {
  total: number;
  overdue: number;
  byStatus: {
    pending?: number;
    'in-progress'?: number;
    completed?: number;
  };
  byPriority: {
    low?: number;
    medium?: number;
    high?: number;
  };
}

interface TaskContextType {
  tasks: Task[];
  stats: TaskStats | null;
  loading: boolean;
  fetchTasks: (filters?: any) => Promise<void>;
  fetchStats: () => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<boolean>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
  getTask: (id: string) => Promise<Task | null>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async (filters?: any) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters) {
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            params.append(key, filters[key]);
          }
        });
      }

      const response = await api.get(`/tasks?${params.toString()}`);
      
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error: any) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/tasks/stats');
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error: any) {
      console.error('Fetch stats error:', error);
    }
  };

  const createTask = async (taskData: Partial<Task>): Promise<boolean> => {
    try {
      const response = await api.post('/tasks', taskData);
      
      if (response.data.success) {
        setTasks(prev => [response.data.data, ...prev]);
        toast.success('Task created successfully!');
        fetchStats(); // Update stats
        return true;
      }
      
      toast.error(response.data.message || 'Failed to create task');
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return false;
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>): Promise<boolean> => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      
      if (response.data.success) {
        setTasks(prev => prev.map(task => 
          task._id === id ? response.data.data : task
        ));
        toast.success('Task updated successfully!');
        fetchStats(); // Update stats
        return true;
      }
      
      toast.error(response.data.message || 'Failed to update task');
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return false;
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      
      if (response.data.success) {
        setTasks(prev => prev.filter(task => task._id !== id));
        toast.success('Task deleted successfully!');
        fetchStats(); // Update stats
        return true;
      }
      
      toast.error(response.data.message || 'Failed to delete task');
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      return false;
    }
  };

  const getTask = async (id: string): Promise<Task | null> => {
    try {
      const response = await api.get(`/tasks/${id}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      return null;
    } catch (error: any) {
      console.error('Get task error:', error);
      return null;
    }
  };

  const value = {
    tasks,
    stats,
    loading,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
    getTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};