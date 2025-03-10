import { useEffect, useState } from "react";

import {
  questionnairesAdditional,
  questionnairesAdditionalProject,
  getResponseByProjectIdApi,
} from "../../Services/Fetch";
import useToast from "../../hooks/useToast";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "../../hooks/useTooltip";

const ProjectsQuestionnaires = ({ questionnaires, paramsId, navigate }) => {
  const { toast } = useToast();
  const [questionnaire, setQuestionnaire] = useState([]);

  const [additionalQuestionnaires, setAdditionalQuestionnaires] = useState([]);
  const [selectedAdditionalQuestionnaire, setSelectedAdditionalQuestionnaire] =
    useState("");
  const [hasResponsesSelected, setHasResponsesSelected] = useState(false);

  const loadAdditionalQuestionnaires = async () => {
    try {
      const response = await fetch(questionnairesAdditional + paramsId);
      const data = await response.json();
  
      console.log("Respuesta de la API:", data); // Verifica la estructura real de `data`
  
      if (!data || typeof data !== "object") {
        throw new Error("Respuesta inesperada del servidor");
      }
  
      const questionnairesWithResponses = data.questionnairesWithResponses ?? [];
      const questionnairesWithoutResponses = data.questionnairesWithoutResponses ?? [];
  
      setQuestionnaire(questionnairesWithResponses);
      setAdditionalQuestionnaires(questionnairesWithoutResponses);
    } catch (error) {
      console.error("Error al cargar cuestionarios adicionales:", error);
    }
  };
  

  useEffect(() => {
    loadAdditionalQuestionnaires();
  }, [paramsId]);

  const handleSelectAdditionalQuestionnaire = async (selectedId) => {
    try {
      const response = await fetch(questionnairesAdditionalProject + paramsId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedId }),
      });
      const data = await response.json();

      // Filtra los cuestionarios ya seleccionados
      const newQuestionnaires = Array.isArray(data)
        ? data.filter(
            (q) => !questionnaire.some((selected) => selected._id === q._id)
          )
        : [data].filter(
            (q) => !questionnaire.some((selected) => selected._id === q._id)
          );

      if (newQuestionnaires.length === 0) {
        // Muestra mensaje de toast indicando que el cuestionario ya ha sido seleccionado
        toast.warning("El cuestionario ya ha sido seleccionado.");
      } else {
        // Actualiza el estado de questionnaire agregando los nuevos cuestionarios
        setQuestionnaire((prevQuestionnaire) => [
          ...prevQuestionnaire,
          ...newQuestionnaires,
        ]);
        setSelectedAdditionalQuestionnaire(selectedId);

        // Verifica si el cuestionario seleccionado tiene respuestas
        const hasResponses = await checkResponses(paramsId, data);
        setHasResponsesSelected(hasResponses);
      }
    } catch (error) {
      console.error("Error al seleccionar cuestionario adicional:", error);
      // Puedes manejar el error mostrando un mensaje al usuario
    }
  };

  const checkResponses = async (project_id, questionnaires) => {
    for (const questionnaire of questionnaires) {
      const hasResponses = await fetchAndCheckResponses(
        project_id,
        questionnaire._id
      );
      if (hasResponses) {
        return true;
      }
    }
    return false;
  };

  const fetchAndCheckResponses = async (project_id, questionnaire_id) => {
    const response = await fetch(
      getResponseByProjectIdApi + project_id + "/" + questionnaire_id
    );
    const data = await response.json();
    return data.length > 0;
  };

  const canSelectAdditionalQuestionnaire = () => {
    return !hasResponsesSelected;
  };

  return (
    <div className="container mx-auto px-4 text-center p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Lista de cuestionarios habilitados
      </h1>
      {questionnaires.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {questionnaires.map((project) => (
            <div key={project._id}>
              <div className="bg-white rounded shadow p-4 transition duration-300 ease-in-out transform hover:scale-105 text-center bg-opacity-75">
                <img
                  src="../../../img/cuestionario.png"
                  className="h-12 w-12 mx-auto mb-4"
                  style={{ color: "#2c3e50" }}
                />
                <h2 className="text-lg font-semibold mb-4 text-gray-900 whitespace-normal max-w-[24rem] lg:text-sm">
                  <span className="inline-block max-w-full truncate">
                    {project.name}
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button
                    className="w-full text-white py-2 rounded transition duration-300 ease-in-out flex items-center text-center justify-center"
                    onClick={() =>
                      navigate(`/response/${project._id}/${paramsId}`)
                    }
                    style={{ backgroundColor: "#2c3e50" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#465669")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2c3e50")
                    }
                  >
                    Iniciar
                  </button>
                  <button
                    className="w-full bg-indigo-900 text-white py-2 rounded hover:bg-indigo-800 transition duration-300 ease-in-out"
                    onClick={() =>
                      navigate(`/listresponses/${project._id}/${paramsId}`)
                    }
                  >
                    Respuestas
                  </button>
                </div>
              </div>
            </div>
          ))}
          {Array.isArray(questionnaire) &&
            questionnaire &&
            questionnaire.map((q) => (
              <div key={q._id}>
                <div className="bg-white rounded shadow p-4 transition duration-300 ease-in-out transform hover:scale-105 text-center bg-opacity-75">
                  <img
                    src="../../../img/cuestionario.png"
                    className="h-12 w-12 mx-auto mb-4"
                    style={{ color: "#2c3e50" }}
                  />
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 whitespace-normal max-w-[24rem] lg:text-sm">
                    <span className="inline-block max-w-full truncate">
                      {q.name}
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      className="w-full text-white py-2 rounded transition duration-300 ease-in-out flex items-center text-center justify-center"
                      onClick={() => navigate(`/response/${q._id}/${paramsId}`)}
                      style={{ backgroundColor: "#2c3e50" }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#465669")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#2c3e50")
                      }
                    >
                      Iniciar
                    </button>
                    <button
                      className="w-full bg-indigo-900 text-white py-2 rounded hover:bg-indigo-800 transition duration-300 ease-in-out"
                      onClick={() =>
                        navigate(`/listresponses/${q._id}/${paramsId}`)
                      }
                    >
                      Respuestas
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-lg mb-4 text-gray-800">
          No hay cuestionarios habilitados
        </p>
      )}

      {additionalQuestionnaires.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            Puede seleccionar otro cuestionario{" "}
            <Tooltip
              content={
                "Puede agregar otro cuestionario disponible para el proyecto"
              }
              position="bottom"
            >
              <QuestionMarkCircleIcon
                height={24}
                width={24}
                className="text-blue-950 hover:underline cursor-pointer ml-2"
              />
            </Tooltip>
          </h2>
          <select
            className="p-2 border border-gray-300 rounded"
            onChange={(e) =>
              handleSelectAdditionalQuestionnaire(e.target.value)
            }
            value={selectedAdditionalQuestionnaire || ""}
          >
            <option value="" disabled>
              Seleccionar cuestionario
            </option>
            {additionalQuestionnaires.map((additionalProject) => (
              <option
                key={additionalProject._id}
                value={additionalProject._id}
                disabled={
                  canSelectAdditionalQuestionnaire() &&
                  additionalProject._id === selectedAdditionalQuestionnaire
                }
              >
                {additionalProject.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ProjectsQuestionnaires;
