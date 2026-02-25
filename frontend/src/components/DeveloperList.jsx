import React from 'react';
import { Edit2, Trash2, Code, Award, DollarSign, AlertCircle } from 'lucide-react';

const DeveloperList = ({ developers, loading, onEdit, onDelete, searchTerm }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!developers || developers.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No hay desarrolladores
        </h3>
        <p className="text-sm text-gray-500">
          {searchTerm 
            ? 'No se encontraron resultados para tu búsqueda'
            : 'Comienza agregando tu primer desarrollador'}
        </p>
      </div>
    );
  }

  const getSeniorityColor = (seniority) => {
    switch(seniority) {
      case 'SR': return 'bg-purple-100 text-purple-700';
      case 'SSR': return 'bg-blue-100 text-blue-700';
      case 'JR': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Desarrollador
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stack
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seniority
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarifa/hora
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {developers.map((dev) => (
            <tr key={dev.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {dev.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900">{dev.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-900">
                  <Code className="w-4 h-4 mr-2 text-gray-400" />
                  {dev.main_stack}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full ${getSeniorityColor(dev.seniority)}`}>
                  <Award className="w-3 h-3 mr-1" />
                  {dev.seniority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm font-semibold text-gray-900">
                  <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                  ${parseFloat(dev.hourly_rate).toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full ${
                  dev.is_active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    dev.is_active ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  {dev.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(dev)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(dev.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeveloperList;