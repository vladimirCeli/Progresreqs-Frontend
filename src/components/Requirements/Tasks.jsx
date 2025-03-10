/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  PencilSquareIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Agrega un cero al mes y al día si son menores de 10
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

const Tasks = ({
  tasks,
  toggleCompleted,
  handleEditDescription,
  handleViewDescription,
  handleDeadlineChange,
  handleSaveDeadline,
  editedDeadline,
  setEditedDeadline,
  variants,
}) => {
  return (
    <>
      <div className="flex flex-col items-center mt-5 xl:px-5">
        <h1 className="font-bold text-lg mb-4 text-center">Lista de tareas</h1>
        <div className="mb-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                initial="hidden"
                animate="visible"
                variants={variants}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
                  <p className="text-sm mb-4 break-all">{task.description}</p>
                  <p className="text-sm mb-2">CWE: {task.cwe}</p>
                  <p className="text-sm mb-2">NIST: {task.nist}</p>
                  {task.write_description ? (
                    <>
                      <button
                        className="flex items-center space-x-1 mb-2 text-sm"
                        onClick={() => handleEditDescription(task)}
                      >
                        <span>Editar Descripción</span>
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="flex items-center space-x-1 mb-2 text-sm"
                        onClick={() => handleViewDescription(task)}
                      >
                        <span>Ver Descripción</span>
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex items-center space-x-1 mb-2 text-sm"
                      onClick={() => handleEditDescription(task)}
                    >
                      <span>Descripción</span>
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  )}
                  {task.deadline ? (
                    <p className="text-sm mb-2">
                      Fecha límite: {task.deadline}
                    </p>
                  ) : (
                    <div className="flex flex-col mb-2">
                      <p className="text-sm mb-2">
                        No tiene una fecha límite, puedes asignar una
                      </p>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={editedDeadline[task.id] || ""}
                          onChange={(e) =>
                            handleDeadlineChange(task.id, e.target.value)
                          }
                          min={getTodayDate()}
                          className="border rounded p-1"
                        />
                        <button
                          className="flex items-center space-x-1 text-sm px-2 bg-blue-800 text-white rounded hover:bg-blue-600"
                          onClick={() => handleSaveDeadline(task)}
                        >
                          <span>Guardar Fecha Límite</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-2 mb-1">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <span className="text-sm">Completar</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={task.completed || false}
                          onChange={() => toggleCompleted(task.id)}
                        />
                        <div className="w-6 h-6 border rounded-md border-gray-400 flex items-center justify-center bg-white transition-all duration-300 ease-in-out">
                          {task.completed && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-4 h-4 text-green-500"
                            >
                              <path
                                strokeLinecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm">No hay tareas</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
