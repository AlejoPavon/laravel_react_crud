import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Bienvenido desarrollador!');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-white">
      {/* Elementos decorativos azules sutiles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Línea de código decorativa */}
      <div className="absolute top-20 right-20 text-blue-100 text-4xl font-mono opacity-10 rotate-12 select-none">
        &lt;code&gt; &lt;/code&gt;
      </div>
      <div className="absolute bottom-20 left-20 text-blue-100 text-4xl font-mono opacity-10 -rotate-12 select-none">
        {'{ ... }'}
      </div>

      {/* Lado izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full">
          {/* Tarjeta blanca con sombra suave */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            
            {/* Icono de programación */}
            <div className="text-center mb-8">
              <div className="inline-block p-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-200 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dev<span className="text-blue-600">Space</span>
              </h1>
              <p className="text-gray-500">
                Gestor de desarrolladores
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-gray-50"
                  placeholder="dev@ejemplo.com"
                  required
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-gray-50"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Opciones */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón principal */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Accediendo...
                  </span>
                ) : (
                  'Ingresar al panel'
                )}
              </button>
            </form>

            {/* Registro */}
            <p className="text-center mt-6 text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Regístrate como developer
              </a>
            </p>

            {/* Términos y condiciones */}
            <p className="text-center mt-4 text-xs text-gray-400">
              Al iniciar sesión aceptas nuestros{' '}
              <a href="#" className="text-blue-500 hover:text-blue-700">términos</a> y{' '}
              <a href="#" className="text-blue-500 hover:text-blue-700">política de privacidad</a>
            </p>
          </div>
        </div>
      </div>

      {/* Lado derecho - SOLO IMAGEN con degradado cuadriculado y puntitos */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Imagen estática (sin parallax) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/login.png')"
          }}
        />
        
        {/* Degradado inferior con cuadrícula y puntitos */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-900 via-blue-800/50 to-transparent">
          
          {/* Patrón de cuadrícula */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}>
          </div>
          
          {/* Patrón de puntitos */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
          </div>

        </div>
      </div>

      {/* Estilos personalizados */}
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

export default Login;