/* eslint-disable react/prop-types */
import RequirementModal from "./RequirementFormM";
import RequirementModalN from "./RequirementFormMN";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "../../hooks/useTooltip";

const ProjectsInfo = ({
  project,
  handleOpen,
  moment,
  open,
  handleClose,
  newRequirement,
  setNewRequirement,
  initialState,
  changeRequirements,
  submitRequirements,
  loading,
  editingId,
  editingIdNotFunctionals,
  openNotFunctional,
  handleOpenNotFunctionals,
  handleCloseNotFunctionals,
  newRequirementsNotFuntional,
  initialState2,
  setNewRequirementsNotFuntional,
  changeRequirementsNotFunctionals,
  submitRequirementsNotFunctionals,
}) => {
  return (
    <>
      <div className="mt-2 text-center xl:px-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          Información del proyecto             <Tooltip
              content={
                "Agrega los requisitos funcionales y no funcionales en formato IEEE830 para mostrar los cuestionarios disponibles"
              }
              position="bottom"
            >
              <QuestionMarkCircleIcon
                height={24}
                width={24}
                className="text-blue-950 hover:underline cursor-pointer ml-2"
              />
            </Tooltip>
        </h1>
        <div className="mt-5 bg-white rounded-lg shadow-xl p-6 border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105 bg-opacity-75">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {project.name}
          </h1>
          <p className="text-base font-semibold mb-4 break-words text-gray-600">
            {project.description}
          </p>
          <p className="text-sm font-semibold mt-2 text-gray-600">
            Proyecto creado el:{" "}
            {moment(project.created_at).format("DD/MM/YYYY")}
          </p>
          <div className="mt-5 flex justify-end space-x-4">
            <button
              onClick={handleOpen}
              
              className="w-full py-2 rounded-lg transition duration-300 ease-in-out bg-indigo-900 text-white hover:bg-indigo-800"

            >
              Agregar Requisitos funcionales
            </button>

            <button
              onClick={handleOpenNotFunctionals}
              className="w-full bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-800 transition duration-300 ease-in-out"
            >
              Agregar Requisitos no funcionales
            </button>
          </div>
        </div>
      </div>
      <RequirementModal
        open={open}
        handleClose={handleClose}
        newRequirement={newRequirement}
        setNewRequirement={setNewRequirement}
        initialState={initialState}
        changeRequirements={changeRequirements}
        submitRequirements={submitRequirements}
        loading={loading}
        editingId={editingId}
      />
      <RequirementModalN
        open={openNotFunctional}
        handleClose={handleCloseNotFunctionals}
        newRequirement={newRequirementsNotFuntional}
        setNewRequirement={setNewRequirementsNotFuntional}
        initialState={initialState2}
        changeRequirements={changeRequirementsNotFunctionals}
        submitRequirements={submitRequirementsNotFunctionals}
        loading={loading}
        editingId={editingIdNotFunctionals}
      />
    </>
  );
};

export default ProjectsInfo;
