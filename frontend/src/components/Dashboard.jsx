import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Briefcase } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Elementos decorativos azules (mismos que el login) */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Líneas de código decorativas (mismas que el login) */}
      <div className="absolute top-20 right-20 text-blue-100 text-4xl font-mono opacity-10 rotate-12 select-none">
        &lt;code&gt; &lt;/code&gt;
      </div>
      <div className="absolute bottom-20 left-20 text-blue-100 text-4xl font-mono opacity-10 -rotate-12 select-none">
        {'{ ... }'}
      </div>

      {/* Navbar simple */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                DevSpace
              </span>
            </div>

            {/* Info usuario y logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal - Solo mensaje de bienvenida */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Icono grande de bienvenida */}
          <div className="inline-block p-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-6 shadow-xl shadow-blue-200">
            <Briefcase className="w-16 h-16 text-white" />
          </div>
          
          {/* Mensaje de bienvenida */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ¡Bienvenido,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {user?.name || 'Desarrollador'}
            </span>
            !
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Has iniciado sesión correctamente en DevSpace. El panel de administración estará disponible próximamente.
          </p>

          {/* Badge de estado */}
          <div className="mt-8 inline-flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">
              Sesión activa - {user?.email}
            </span>
          </div>
        </div>
      </main>

      {/* Estilos de animación (mismos que el login) */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 20px) scale(0.95); }
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;