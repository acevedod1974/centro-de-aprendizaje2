import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Centro de Aprendizaje</h3>
                <p className="text-sm text-gray-400">Ingeniería Mecánica</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma educativa especializada en procesos de fabricación industrial 
              con herramientas interactivas y recursos técnicos actualizados.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Procesos de Fabricación</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Herramientas Interactivas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Recursos Multimedia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centro de Evaluación</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Manual Técnico</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tablas de Referencia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Galería de Imágenes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Videos Educativos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">info@ingenieriacentro.edu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">+34 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Centro de Aprendizaje de Ingeniería Mecánica. Todos los derechos reservados.
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;