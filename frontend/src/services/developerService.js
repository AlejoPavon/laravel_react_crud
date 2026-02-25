import api from './api';

const developerService = {
  // Obtener todos los desarrolladores
  getAll: async () => {
    try {
      const response = await api.get('/developers');
      console.log('Respuesta completa getAll:', response);
      
      // Garantizar que siempre devolvemos un array
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (response.data && typeof response.data === 'object') {
        // Si es un objeto pero no tiene la estructura esperada, devolver array vacío
        console.warn('Formato inesperado, devolviendo array vacío:', response.data);
        return [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error en getAll:', error);
      return []; // En caso de error, devolver array vacío
    }
  },

  // Obtener un desarrollador por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/developers/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },

  // Crear nuevo desarrollador
  create: async (data) => {
    try {
      const response = await api.post('/developers', data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error en create:', error);
      throw error;
    }
  },

  // Actualizar desarrollador
  update: async (id, data) => {
    try {
      const response = await api.put(`/developers/${id}`, data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  },

  // Eliminar desarrollador
  delete: async (id) => {
    try {
      const response = await api.delete(`/developers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error en delete:', error);
      throw error;
    }
  },

  // Toggle active status
  toggleActive: async (id) => {
    try {
      const response = await api.patch(`/developers/${id}/toggle-active`);
      return response.data;
    } catch (error) {
      console.error('Error en toggleActive:', error);
      throw error;
    }
  }
};

export default developerService;