import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Code, UserPlus, Search } from 'lucide-react';
import developerService from '../services/developerService';
import DeveloperList from './DeveloperList';
import DeveloperForm from './DeveloperForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Estados
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingDev, setEditingDev] = useState(null);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Cargar desarrolladores
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await developerService.getAll();
      console.log('Datos recibidos en Dashboard:', data);
      
      // Garantizar que siempre sea un array
      if (Array.isArray(data)) {
        setDevelopers(data);
      } else {
        console.warn('Formato inesperado, usando array vacío:', data);
        setDevelopers([]);
      }
    } catch (error) {
      console.error('Error al cargar desarrolladores:', error);
      setError('Error al cargar los datos');
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleCreate = async (formData) => {
    try {
      await developerService.create(formData);
      await fetchDevelopers();
      setShowForm(false);
    } catch (error) {
      console.error('Error al crear:', error);
      alert('Error al crear el desarrollador');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await developerService.update(editingDev.id, formData);
      await fetchDevelopers();
      setShowForm(false);
      setEditingDev(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el desarrollador');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este desarrollador?')) return;
    
    try {
      await developerService.delete(id);
      await fetchDevelopers();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el desarrollador');
    }
  };

  const handleEdit = (dev) => {
    setEditingDev(dev);
    setShowForm(true);
  };

  // Asegurar que developers es array antes de usarlo
  const developersList = Array.isArray(developers) ? developers : [];
  
  // Estadísticas
  const totalDevs = developersList.length;
  const activeDevs = developersList.filter(dev => dev.is_active).length;
  const totalPayroll = developersList.reduce((sum, dev) => sum + (parseFloat(dev.hourly_rate) * 160 || 0), 0);
  
  // Tecnologías únicas
  const technologies = [...new Set(developersList
    .map(dev => dev.main_stack)
    .filter(Boolean)
  )];

  // Desarrolladores filtrados
  const filteredDevs = developersList.filter(dev => {
    const matchesSearch = 
      (dev.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (dev.main_stack?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesTech = selectedTech === 'all' || dev.main_stack === selectedTech;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' ? dev.is_active : !dev.is_active);
    
    return matchesSearch && matchesTech && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  DevSpace
                </span>
                <span className="text-xs text-gray-500 block -mt-1">Gestor de desarrolladores</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Panel de Control
            </h1>
            <p className="text-gray-500 mt-1">
              Gestiona los desarrolladores de tu equipo
            </p>
          </div>
          
          <button
            onClick={() => {
              setEditingDev(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-200"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nuevo Developer</span>
          </button>
        </div>

        {/* Cards de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900 mb-1">{totalDevs}</div>
            <p className="text-sm text-gray-600">Total Desarrolladores</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900 mb-1">{activeDevs}</div>
            <p className="text-sm text-gray-600">Activos</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900 mb-1">${Math.round(totalPayroll).toLocaleString()}</div>
            <p className="text-sm text-gray-600">Nómina Mensual (estimada)</p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        {/* Lista de desarrolladores */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <DeveloperList
            developers={filteredDevs}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
          />
        </div>
      </main>

      {/* Modal de formulario */}
      <DeveloperForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingDev(null);
        }}
        onSave={editingDev ? handleUpdate : handleCreate}
        developer={editingDev}
        isEditing={!!editingDev}
      />
    </div>
  );
};

export default Dashboard;