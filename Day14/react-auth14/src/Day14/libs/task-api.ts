
import apiClient from './client-api';
import type { Task } from '../types';

export const getTasks = () => apiClient.get('/workspaces/tasks');

export const login = (username: string, password: string) =>
  apiClient.post('/auth/login', { username, password }, false);

export const getTaskById = (id: number) =>
  apiClient.get(`/workspaces/tasks/${id}`);

export const createTask = (task: Task) =>
  apiClient.post('/workspaces/tasks', task);

export const updateTask = (id: number, task: Task) =>
  apiClient.patch(`/workspaces/tasks/${id}`, task);

export const deleteTask = (id: number) =>
  apiClient.delete(`/workspaces/tasks/${id}`);

export const getTasksByAssignee = (assigneeId: number) =>
  apiClient.get(`/workspaces/tasks/assignee/${assigneeId}`);
