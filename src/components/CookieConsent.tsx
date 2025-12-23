import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield, CheckCircle } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
    initializeAnalytics();
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const userPreferences = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(userPreferences));
    setIsVisible(false);

    if (preferences.analytics) {
      initializeAnalytics();
    }
  };

  const initializeAnalytics = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] animate-fadeIn" />

      <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[1000] animate-slideUp">
        <div className="bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] border-2 border-[#A8FF00]/30 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A8FF00] via-[#96E600] to-[#A8FF00]" />

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-[#A8FF00] to-[#96E600] p-3 rounded-xl shadow-lg">
                  <Cookie className="h-6 w-6 text-[#1A1A1A]" />
                </div>
                <h3 className="text-xl font-bold text-white">Uso de Cookies</h3>
              </div>
              <button
                onClick={handleRejectNonEssential}
                className="text-white/60 hover:text-white transition-colors p-2"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!showSettings ? (
              <>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación,
                  analizar el tráfico del sitio web mediante Google Analytics y personalizar el contenido.
                  Puedes aceptar todas las cookies o gestionar tus preferencias.
                </p>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] py-3 px-6 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(168,255,0,0.5)] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Aceptar todas</span>
                  </button>

                  <button
                    onClick={handleRejectNonEssential}
                    className="w-full bg-white/10 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    Solo esenciales
                  </button>

                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-full bg-transparent text-white/80 py-3 px-6 rounded-xl font-semibold hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configurar preferencias</span>
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href="/cookies.html"
                    target="_blank"
                    className="text-[#A8FF00] hover:text-[#96E600] text-sm font-medium transition-colors inline-flex items-center space-x-1"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Más información sobre cookies</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-[#A8FF00]" />
                        <span className="font-semibold text-white">Cookies Necesarias</span>
                      </div>
                      <span className="text-xs bg-[#A8FF00] text-[#1A1A1A] px-2 py-1 rounded-full font-bold">
                        Siempre activas
                      </span>
                    </div>
                    <p className="text-sm text-white/60">
                      Esenciales para el funcionamiento del sitio web.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="font-semibold text-white">Cookies Analíticas</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={() => togglePreference('analytics')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8FF00]"></div>
                      </label>
                    </div>
                    <p className="text-sm text-white/60">
                      Google Analytics para análisis de uso y mejora del sitio.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="font-semibold text-white">Cookies de Marketing</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={() => togglePreference('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8FF00]"></div>
                      </label>
                    </div>
                    <p className="text-sm text-white/60">
                      Publicidad personalizada y seguimiento de conversiones.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="font-semibold text-white">Cookies Funcionales</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={() => togglePreference('functional')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8FF00]"></div>
                      </label>
                    </div>
                    <p className="text-sm text-white/60">
                      Recordar preferencias y mejorar tu experiencia.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleSavePreferences}
                    className="w-full bg-gradient-to-r from-[#A8FF00] to-[#96E600] text-[#1A1A1A] py-3 px-6 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(168,255,0,0.5)] transition-all duration-300"
                  >
                    Guardar preferencias
                  </button>

                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-full bg-white/10 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    Volver
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
