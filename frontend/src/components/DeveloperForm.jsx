import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const DeveloperForm = ({ isOpen, onClose, onSave, developer, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    main_stack: '',
    seniority: 'JR',
    hourly_rate: '',
    is_active: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (developer && isEditing) {
      setFormData({
        name: developer.name || '',
        main_stack: developer.main_stack || '',
        seniority: developer.seniority || 'JR',
        hourly_rate: developer.hourly_rate || '',
        is_active: developer.is_active !== undefined ? developer.is_active : true
      });
    } else {
      setFormData({
        name: '',
        main_stack: '',
        seniority: 'JR',
        hourly_rate: '',
        is_active: true
      });
    }
    setErrors({});
  }, [developer, isEditing, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.main_stack?.trim()) {
      newErrors.main_stack = 'El stack principal es requerido';
    }
    if (!formData.seniority) {
      newErrors.seniority = 'La seniority es requerida';
    }
    if (!formData.hourly_rate) {
      newErrors.hourly_rate = 'La tarifa por hora es requerida';
    } else if (isNaN(formData.hourly_rate) || parseFloat(formData.hourly_rate) <= 0) {
      newErrors.hourly_rate = 'La tarifa debe ser un número positivo';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-all">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? 'Editar Desarrollador' : 'Nuevo Desarrollador'}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Juan Pérez"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stack Principal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="main_stack"
                      value={formData.main_stack}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.main_stack ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Laravel, React, Python..."
                    />
                    {errors.main_stack && (
                      <p className="mt-1 text-sm text-red-600">{errors.main_stack}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seniority <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="seniority"
                      value={formData.seniority}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.seniority ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="JR">Junior (JR)</option>
                      <option value="SSR">Semi-Senior (SSR)</option>
                      <option value="SR">Senior (SR)</option>
                    </select>
                    {errors.seniority && (
                      <p className="mt-1 text-sm text-red-600">{errors.seniority}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tarifa por hora ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="hourly_rate"
                      value={formData.hourly_rate}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.hourly_rate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="25.00"
                    />
                    {errors.hourly_rate && (
                      <p className="mt-1 text-sm text-red-600">{errors.hourly_rate}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        name="is_active"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="is_active" className="text-sm text-gray-700">
                        Desarrollador activo
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-2xl">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Actualizar' : 'Crear'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperForm;