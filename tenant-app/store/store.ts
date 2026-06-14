import { create } from 'zustand';

// Assuming the API runs on port 3000
const API_URL = 'http://localhost:3000/api';
// Dummy token for testing (since we haven't built real login UI yet)
const MOCK_TOKEN = 'mock-jwt-token-for-tenant-1';

interface AppState {
  teams: any[];
  departments: any[];
  areas: any[];
  systems: any[];
  tasks: any[];
  loading: boolean;
  error: string | null;
  fetchDictionaries: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: any) => Promise<void>;
  createBulkTasks: (tasks: any[]) => Promise<void>;
  updateTask: (taskId: string, data: any) => Promise<void>;
  createTeam: (name: string) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
  createArea: (name: string) => Promise<void>;
  createSystem: (name: string, teamId: string) => Promise<void>;
  deleteSystem: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  teams: [],
  departments: [],
  areas: [],
  systems: [],
  tasks: [],
  loading: false,
  error: null,

  fetchDictionaries: async () => {
    set({ loading: true, error: null });
    try {
      const headers = { 'Authorization': `Bearer ${MOCK_TOKEN}` };
      const [teamsRes, depsRes, areasRes, sysRes] = await Promise.all([
        fetch(`${API_URL}/dictionaries/teams`, { headers }),
        fetch(`${API_URL}/dictionaries/departments`, { headers }),
        fetch(`${API_URL}/dictionaries/areas`, { headers }),
        fetch(`${API_URL}/dictionaries/systems`, { headers })
      ]);

      const teams = await teamsRes.json();
      const departments = await depsRes.json();
      const areas = await areasRes.json();
      const systems = await sysRes.json();

      set({ teams, departments, areas, systems, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${MOCK_TOKEN}` }
      });
      const data = await res.json();
      set({ tasks: data.tasks || [], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createTask: async (taskData) => {
    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MOCK_TOKEN}`
        },
        body: JSON.stringify(taskData)
      });
      await get().fetchTasks();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  createBulkTasks: async (tasks) => {
    try {
      await fetch(`${API_URL}/tasks/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MOCK_TOKEN}`
        },
        body: JSON.stringify({ tasks })
      });
      await get().fetchTasks();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateTask: async (taskId, data) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MOCK_TOKEN}`
        },
        body: JSON.stringify(data)
      });
      await get().fetchTasks();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  createTeam: async (name) => {
    try {
      await fetch(`${API_URL}/dictionaries/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MOCK_TOKEN}` },
        body: JSON.stringify({ name })
      });
      await get().fetchDictionaries();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteTeam: async (id) => {
    try {
      await fetch(`${API_URL}/dictionaries/teams/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${MOCK_TOKEN}` }
      });
      await get().fetchDictionaries();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  createArea: async (name) => {
    try {
      await fetch(`${API_URL}/dictionaries/areas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MOCK_TOKEN}` },
        body: JSON.stringify({ name })
      });
      await get().fetchDictionaries();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  createSystem: async (name, teamId) => {
    try {
      await fetch(`${API_URL}/dictionaries/systems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MOCK_TOKEN}` },
        body: JSON.stringify({ name, autoAssignTeamId: teamId || null })
      });
      await get().fetchDictionaries();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteSystem: async (id) => {
    try {
      await fetch(`${API_URL}/dictionaries/systems/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${MOCK_TOKEN}` }
      });
      await get().fetchDictionaries();
    } catch (err: any) {
      set({ error: err.message });
    }
  }

}));
