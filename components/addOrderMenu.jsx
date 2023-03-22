import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AddOrderMenu = (props) => {
  const {
    isOpen,
    setIsOpen,
    infoCard,
    addToOrder,
    modifyOrder,
    setModifyOrder,
    updateData,
  } = props;
  const { name, description, price, price_id, singleItemPrice, quantity } =
    infoCard;
  const [newOrderQuantity, setNewOrderQuantity] = useState(1);
  const [lastOrderQuantity, setLastOrderQuantity] = useState();
  const newOrderPrice = price * newOrderQuantity;
  const lastOrderPrice = singleItemPrice * lastOrderQuantity;

  useEffect(() => {
    setLastOrderQuantity(quantity);
  }, [infoCard]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => {
            setIsOpen(false);
            setModifyOrder(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed  inset-0 overflow-y-auto">
            <div className="fixed bottom-0 sm:flex sm:min-h-full sm:items-center sm:justify-center w-full sm:text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-100"
              >
                <Dialog.Panel>
                  <div className="fixed bottom-0 sm:relative sm:justify-center sm:items-center sm:rounded-2xl shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] bg-white w-screen sm:w-96 rounded-t-2xl  text-center">
                    <div className="space-y-2 p-4">
                      <div>
                        <div className="flex justify-center">
                          <p className=" font-semibold text-black grow -mr-4 ">
                            {name}
                          </p>
                          <div
                            className="text-gray-400"
                            onClick={() => {
                              setIsOpen(false);
                              setNewOrderQuantity(1);
                              setModifyOrder(false);
                            }}
                          >
                            <CloseIcon />
                          </div>
                        </div>

                        <p className="font-semibold text-gray-900 ">
                          {" "}
                          {(modifyOrder === false && newOrderPrice) ||
                            lastOrderPrice}{" "}
                          €
                        </p>
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    </div>

                    <div className="shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] sm:rounded-2xl space-y-2 p-4">
                      <div className="flex text-lg pb-2 justify-center space-x-6">
                        <button
                          onClick={
                            (modifyOrder === false &&
                              (() => {
                                if (newOrderQuantity === 1) {
                                  return;
                                }
                                setNewOrderQuantity(newOrderQuantity - 1);
                              })) ||
                            (() => {
                              if (lastOrderQuantity === 1) {
                                return;
                              }
                              setLastOrderQuantity(lastOrderQuantity - 1);
                            })
                          }
                          className="text-black text-lg hover:scale-125 outline-none"
                        >
                          -
                        </button>
                        <p className="font-semibold text-black">
                          {(modifyOrder === false && newOrderQuantity) ||
                            lastOrderQuantity}
                        </p>
                        <button
                          onClick={
                            (modifyOrder === false &&
                              (() => {
                                setNewOrderQuantity(newOrderQuantity + 1);
                              })) ||
                            (() => {
                              setLastOrderQuantity(lastOrderQuantity + 1);
                            })
                          }
                          className="text-black text-lg hover:scale-125 outline-none"
                        >
                          +
                        </button>
                      </div>
                      {modifyOrder === true && (
                        <button
                          onClick={() => {
                            updateData(name, lastOrderQuantity, lastOrderPrice);
                            setIsOpen(false);
                            setModifyOrder(false);
                            setNewOrderQuantity(1);
                          }}
                          className=" bg-amber-500 text-white p-2 w-full rounded-full"
                        >
                          {`modifica ordine ${lastOrderPrice}€`}
                        </button>
                      )}
                      {modifyOrder === false && (
                        <button
                          onClick={() => {
                            addToOrder(
                              name,
                              newOrderPrice,
                              newOrderQuantity,
                              description,
                              price_id
                            );
                            setIsOpen(false);
                            setNewOrderQuantity(1);
                          }}
                          className=" bg-amber-500 text-white p-2 w-full rounded-full"
                        >
                          {`aggiungi all'ordine ${newOrderPrice}€`}
                        </button>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddOrderMenu;
