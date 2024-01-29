/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QueueListIcon } from "@heroicons/react/24/outline";

import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ImageComparison = ({ open, handleClose, beforeImage, afterImage }) => {
  const cancelButtonRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Transition.Root show={open}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={
            () => {
              cancelButtonRef;
              closeImageViewer();
            }
          }
          onClose={
            () => {
              handleClose();
              closeImageViewer();
            }
            }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
             
            />
          </Transition.Child>

          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                <div className="bg-white px-6 pb-6 pt-8 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start sm:mx-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <QueueListIcon
                        className="h-6 w-6 text-indigo-950"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Cuestionarios OWASP SAMM
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="mt-4">
                          <p className="text-sm md:text-md mb-8 text-center text-gray-600">
                            Descubre el aliado definitivo para fortalecer la
                            seguridad de tu software: OWASP SAMM. Evalúa y
                            mejora tu proyecto en áreas clave como Gobernanza,
                            Diseño, Implementación, Verificación y Operaciones.
                            Da el siguiente paso en seguridad informática con
                            nuestra evaluación y descubre cómo fortalecer tu
                            postura de seguridad. Convierte la seguridad en una
                            ventaja, no un obstáculo. Explora visualmente la
                            evolución de la seguridad en tus proyectos con los
                            cuestionarios de OWASP SAMM. Sumérgete en el cambio
                            y potencia la madurez de tu proyecto.
                          </p>

                          <div className="flex justify-center items-center">
                            <div className="w-full md:w-4/5 lg:w-3/5 p-4 md:p-8">
                              <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                  src={beforeImage}
                                  alt="Antes"
                                  className="w-96 h-auto transform transition-transform hover:scale-105 duration-300 ease-in-out rounded-lg"
                                  onClick={() => handleImageClick(beforeImage)}
                                />
                                 <p className="text-center mt-2 text-gray-600 cursor-pointer" onClick={() => handleImageClick(beforeImage)}>Click para ver la imagen</p>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              <ArrowRightIcon className="h-12 w-12 text-gray-500 mx-4" />
                            </div>
                            <div className="w-full md:w-4/5 lg:w-3/5 p-4 md:p-8">
                              <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                  src={afterImage}
                                  alt="Después"
                                  className="w-96 h-auto transform transition-transform hover:scale-105 duration-300 ease-in-out rounded-lg"
                                  onClick={() => handleImageClick(afterImage)}
                                />
                                <p className="text-center mt-2 text-gray-600 cursor-pointer" onClick={() => handleImageClick(afterImage)}>Click para ver la imagen</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    Cerrar
                  </button>
                </div>
                {selectedImage && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75"
                      onClick={closeImageViewer}
                    >
                      <div className="relative w-auto max-w-3/4 max-h-full bg-white p-4">
                        <button
                          className="absolute top-4 right-4 text-gray-700 cursor-pointer"
                          onClick={closeImageViewer}
                        >
                          <span className="text-2xl">×</span>
                        </button>
                        <img
                          src={selectedImage}
                          alt="Imagen completa"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
              </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ImageComparison;