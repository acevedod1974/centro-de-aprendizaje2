import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 flex flex-col h-full">
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
              Plataforma educativa especializada en procesos de fabricación
              industrial con herramientas interactivas y recursos técnicos
              actualizados.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/procesos"
                  className="text-gray-400 hover:text-white transition-colors block w-full"
                >
                  Procesos de Fabricación
                </Link>
              </li>
              <li>
                <Link
                  to="/herramientas"
                  className="text-gray-400 hover:text-white transition-colors block w-full"
                >
                  Herramientas Interactivas
                </Link>
              </li>
              <li>
                <Link
                  to="/recursos"
                  className="text-gray-400 hover:text-white transition-colors block w-full"
                >
                  Recursos Multimedia
                </Link>
              </li>
              <li>
                <Link
                  to="/evaluacion"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Centro de Evaluación
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Manual Técnico
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tablas de Referencia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Galería de Imágenes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Videos Educativos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:info@ingenieriacentro.edu.ve"
                  aria-label="Enviar correo a info@ingenieriacentro.edu.ve"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  info@ingenieriacentro.edu.ve
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <a
                  href="tel:+582861234567"
                  aria-label="Llamar al +58 286 123 4567"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  +58 286 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">
                  Ciudad Guayana, Venezuela
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom bar for copyright/socials, responsive flex */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-6 text-sm text-gray-400">
          <span>
            &copy; {new Date().getFullYear()} Centro de Aprendizaje. Todos los
            derechos reservados.
          </span>
          <div className="flex space-x-4">
            {/* Social icons, add aria-labels for a11y */}
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
