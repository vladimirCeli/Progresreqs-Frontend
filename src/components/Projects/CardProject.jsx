/* eslint-disable react/prop-types */

import Tooltip from "../../hooks/useTooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const CardProject = ({ projects, handleDelete, navigate }) => {
  return (
    <div className="relative">
      <div className="container p-8 mx-auto">
        <div className="">
          {projects.length > 0 ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Lista de proyectos
              </h1>
              <p className="text-lg mb-4 text-blue-950 font-bold">
                ¡Genial! Hay proyectos disponibles. ¡Haz clic en VER para
                comenzar!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="bg-white rounded shadow p-4 transition duration-300 ease-in-out transform hover:scale-105 bg-opacity-75">
                      <h2 className="text-lg font-semibold mb-2 truncate text-gray-900">
                        {project.name}
                      </h2>
                      <p className="text-sm text-gray-700 mb-4 truncate">
                        {project.description}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          className="w-full text-white py-2 rounded transition duration-300 ease-in-out"
                          onClick={() => navigate(`/projects/${project.id}`)}
                          style={{ backgroundColor: "#2c3e50" }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#465669")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#2c3e50")
                          }
                        >
                          Ver
                        </button>

                        <button
                          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-300 ease-in-out"
                          onClick={() =>
                            navigate(`/projects/${project.id}/edit`)
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                          onClick={() => handleDelete(project.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
            {/* Mensaje explicativo con estilo mejorado */}
            <p className="text-lg text-center text-gray-700">
              El ícono de interrogación proporciona información detallada sobre el
              funcionamiento de esta sección. Simplemente pasa el ratón sobre el ícono
              para obtener más detalles.
            </p>
            
            {/* Tooltip con ícono de círculo e interrogación */}
            <Tooltip
              content="Primero, crea un nuevo proyecto e ingresa el nombre y la descripción. Después, la lista de proyectos se mostrará en esta misma ventana."
              position="bottom"
            >
              <QuestionMarkCircleIcon
                height={24}
                width={24}
                className="text-blue-950 hover:underline cursor-pointer"
              />
            </Tooltip>
          
            {/* Mensaje indicando la falta de proyectos */}
            <p className="text-lg text-center text-gray-700">
              ¡Ups! No hay proyectos disponibles en este momento.
            </p>
            
            {/* Botón para crear un nuevo proyecto */}
            <button
              className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900"
              onClick={() => navigate("/projects/new")}
            >
              Nuevo Proyecto
            </button>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
