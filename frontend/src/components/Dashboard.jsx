import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Users, Briefcase, DollarSign, Calendar, Search,
  Plus, Filter, LogOut, Code, ChevronDown,
  Mail, Phone, Award, Clock, TrendingUp,
  Edit2, Trash2, X, CheckCircle, AlertCircle,
  UserPlus, Download, Save
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Estados
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDev, setEditingDev] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    position: '',
    technologies: [],
    salary: '',
    status: 'active',
    experience: 0,
    joined_date: '',
    phone: ''
  });

  // Cargar desarrolladores
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/developers');
      setDevelopers(response.data);
    } catch (error) {
      console.error('Error al cargar desarrolladores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Estadísticas
  const totalDevs = developers.length;
  const activeDevs = developers.filter(dev => dev.status === 'active').length;
  const totalPayroll = developers.reduce((sum, dev) => sum + (parseFloat(dev.salary) || 0), 0);
  const newDevs = developers.filter(dev => {
    if (!dev.joined_date) return false;
    const daysAgo = (new Date() - new Date(dev.joined_date)) / (1000 * 3600 * 24);
    return daysAgo <= 30;
  }).length;

  // Tecnologías únicas
  const technologies = [...new Set(developers.flatMap(dev => {
    try {
      return typeof dev.technologies === 'string' 
        ? JSON.parse(dev.technologies) 
        : (dev.technologies || []);
    } catch {
      return [];
    }
  }))];

  // Desarrolladores filtrados
  const filteredDevs = developers.filter(dev => {
    const devTechnologies = (() => {
      try {
        return typeof dev.technologies === 'string' 
          ? JSON.parse(dev.technologies) 
          : (dev.technologies || []);
      } catch {
        return [];
      }
    })();

    const matchesSearch = 
      dev.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = selectedTech === 'all' || devTechnologies.includes(selectedTech);
    const matchesStatus = selectedStatus === 'all' || dev.status === selectedStatus;
    
    return matchesSearch && matchesTech && matchesStatus;
  });

  // Handlers del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTechnology = () => {
    if (techInput && !formData.technologies.includes(techInput)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      position: '',
      technologies: [],
      salary: '',
      status: 'active',
      experience: 0,
      joined_date: '',
      phone: ''
    });
    setTechInput('');
    setEditingDev(null);
  };

  const handleEdit = (dev) => {
    setEditingDev(dev);
    setFormData({
      name: dev.name || '',
      email: dev.email || '',
      password: '',
      password_confirmation: '',
      position: dev.position || '',
      technologies: (() => {
        try {
          return typeof dev.technologies === 'string' 
            ? JSON.parse(dev.technologies) 
            : (dev.technologies || []);
        } catch {
          return [];
        }
      })(),
      salary: dev.salary || '',
      status: dev.status || 'active',
      experience: dev.experience || 0,
      joined_date: dev.joined_date || '',
      phone: dev.phone || ''
    });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        technologies: JSON.stringify(formData.technologies),
        salary: formData.salary ? parseFloat(formData.salary) : null
      };

      // Si no hay password, lo eliminamos (para edición)
      if (!dataToSend.password) {
        delete dataToSend.password;
        delete dataToSend.password_confirmation;
      }

      if (editingDev) {
        // Actualizar
        await api.put(`/developers/${editingDev.id}`, dataToSend);
      } else {
        // Crear nuevo
        await api.post('/developers', dataToSend);
      }
      
      // Recargar lista
      await fetchDevelopers();
      
      // Cerrar modal y resetear
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el desarrollador');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este desarrollador?')) return;
    
    try {
      await api.delete(`/developers/${id}`);
      await fetchDevelopers();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el desarrollador');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo con </> */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transform hover:scale-105 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  DevSpace
                </span>
                <span className="text-xs text-gray-500 block -mt-1">Gestor de desarrolladores</span>
              </div>
            </div>

            {/* Perfil y logout */}
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

      {/* Contenido principal */}
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
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all flex items-center space-x-2 border border-gray-200">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-200"
            >
              <UserPlus className="w-4 h-4" />
              <span>Nuevo Developer</span>
            </button>
          </div>
        </div>

        {/* Cards de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <SummaryCard
                icon={<Users className="w-6 h-6 text-blue-600" />}
                label="Total Developers"
                value={totalDevs}
                sublabel="Registrados en el sistema"
                trend="up"
                bgColor="bg-blue-50"
              />
              <SummaryCard
                icon={<Briefcase className="w-6 h-6 text-green-600" />}
                label="Activos"
                value={activeDevs}
                sublabel={`${Math.round(activeDevs/totalDevs*100) || 0}% del equipo`}
                trend="neutral"
                bgColor="bg-green-50"
              />
              <SummaryCard
                icon={<DollarSign className="w-6 h-6 text-purple-600" />}
                label="Nómina Mensual"
                value={`$${(totalPayroll / 1000).toFixed(1)}k`}
                sublabel="Total en salarios"
                trend="up"
                bgColor="bg-purple-50"
              />
              <SummaryCard
                icon={<Calendar className="w-6 h-6 text-amber-600" />}
                label="Nuevos (30 días)"
                value={newDevs}
                sublabel="Últimas contrataciones"
                trend="up"
                bgColor="bg-amber-50"
              />
            </>
          )}
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, puesto o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Botón de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              <Filter className="w-5 h-5 text-gray-500" />
              <span>Filtros</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filtros expandibles */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="all">Todas las tecnologías</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activo</option>
                  <option value="probation">Período de prueba</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tabla de desarrolladores */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desarrollador</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puesto</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tecnologías</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRowSkeleton key={i} />
                  ))
                ) : filteredDevs.length > 0 ? (
                  filteredDevs.map((dev) => {
                    const devTechnologies = (() => {
                      try {
                        return typeof dev.technologies === 'string' 
                          ? JSON.parse(dev.technologies) 
                          : (dev.technologies || []);
                      } catch {
                        return [];
                      }
                    })();

                    return (
                      <tr key={dev.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md">
                              {dev.name?.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">{dev.name}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {dev.email}
                              </div>
                              {dev.phone && (
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {dev.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{dev.position || '—'}</div>
                          {dev.experience > 0 && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              {dev.experience} años exp.
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {devTechnologies.slice(0, 3).map(tech => (
                              <span key={tech} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg font-medium">
                                {tech}
                              </span>
                            ))}
                            {devTechnologies.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
                                +{devTechnologies.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ${parseFloat(dev.salary || 0).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">/mes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={dev.status || 'inactive'} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(dev)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(dev.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Search className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-lg font-medium">No se encontraron resultados</p>
                        <p className="text-sm">Intenta con otros filtros o términos de búsqueda</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación simple */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">{filteredDevs.length}</span> de{' '}
                <span className="font-medium">{developers.length}</span> desarrolladores
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para añadir/editar desarrollador */}
      {(showAddModal) && (
        <DeveloperModal
          formData={formData}
          setFormData={setFormData}
          techInput={techInput}
          setTechInput={setTechInput}
          onAddTechnology={handleAddTechnology}
          onRemoveTechnology={handleRemoveTechnology}
          onSave={handleSave}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          saving={saving}
          isEditing={!!editingDev}
        />
      )}
    </div>
  );
};

// Componente Skeleton para cards
const SummaryCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
    <div className="w-20 h-8 bg-gray-200 rounded-lg mb-2"></div>
    <div className="w-32 h-4 bg-gray-200 rounded"></div>
  </div>
);

// Componente Skeleton para filas
const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
        <div className="ml-4 space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="space-y-2">
        <div className="w-28 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex gap-1">
        <div className="w-16 h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-16 h-6 bg-gray-200 rounded-lg"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
      <div className="w-12 h-3 bg-gray-200 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
    </td>
    <td className="px-6 py-4">
      <div className="flex justify-end space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </td>
  </tr>
);

// Componente SummaryCard
const SummaryCard = ({ icon, label, value, sublabel, trend, bgColor }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all transform hover:scale-[1.02]">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>
      {trend === 'up' && (
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" />
          +12%
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-xs text-gray-400 mt-2">{sublabel}</p>
  </div>
);

// Componente StatusBadge
const StatusBadge = ({ status }) => {
  const config = {
    active: { 
      color: 'bg-green-100 text-green-700 border-green-200', 
      label: 'Activo',
      icon: <CheckCircle className="w-3 h-3 mr-1" />
    },
    probation: { 
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
      label: 'Prueba',
      icon: <Clock className="w-3 h-3 mr-1" />
    },
    inactive: { 
      color: 'bg-gray-100 text-gray-700 border-gray-200', 
      label: 'Inactivo',
      icon: <AlertCircle className="w-3 h-3 mr-1" />
    }
  };
  
  const { color, label, icon } = config[status] || config.inactive;
  
  return (
    <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${color}`}>
      {icon}
      {label}
    </span>
  );
};

// Modal para crear/editar
const DeveloperModal = ({ 
  formData, 
  setFormData, 
  techInput, 
  setTechInput, 
  onAddTechnology, 
  onRemoveTechnology, 
  onSave, 
  onClose, 
  saving,
  isEditing 
}) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
      </div>

      <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Editar Desarrollador' : 'Nuevo Desarrollador'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password (solo para nuevo o si se quiere cambiar) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? 'Nueva contraseña (dejar en blanco para no cambiar)' : 'Contraseña'} 
                {!isEditing && <span className="text-red-500">*</span>}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isEditing}
              />
            </div>

            {/* Confirmar Password */}
            {!isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isEditing}
                />
              </div>
            )}

            {/* Puesto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puesto
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Senior Frontend Developer"
              />
            </div>

            {/* Tecnologías */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tecnologías
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: React, Laravel, Vue..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTechnology())}
                />
                <button
                  type="button"
                  onClick={onAddTechnology}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Agregar
                </button>
              </div>
              
              {/* Lista de tecnologías */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map(tech => (
                  <span key={tech} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {tech}
                    <button
                      type="button"
                      onClick={() => onRemoveTechnology(tech)}
                      className="ml-2 text-blue-700 hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Salario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salario mensual ($)
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="45000"
              />
            </div>

            {/* Experiencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Años de experiencia
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            {/* Fecha de ingreso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de ingreso
              </label>
              <input
                type="date"
                name="joined_date"
                value={formData.joined_date}
                onChange={(e) => setFormData(prev => ({ ...prev, joined_date: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+34 600 123 456"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Activo</option>
                <option value="probation">Período de prueba</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Actualizar' : 'Crear'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;