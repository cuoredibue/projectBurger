import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AddOrderMenu = (props) => {
  const { isOpen, setIsOpen, infoCard, addToOrder } = props;
  const { name, description, price } = infoCard;
  const [quantity, setQuantity] = useState(1);
  const newPrice = price * quantity;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => {
            setIsOpen(false);
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

          <div className="  overflow-y-auto">
            <div className="fixed bottom-0 ">
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
                  <div className="fixed bottom-0 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] bg-white w-screen rounded-t-2xl  text-center">
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
                              setQuantity(1);
                            }}
                          >
                            <CloseIcon />
                          </div>
                        </div>

                        <p className="font-semibold text-gray-900 ">
                          {" "}
                          {price} €
                        </p>
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    </div>

                    <div className="shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] space-y-2 p-4">
                      <div className="flex text-lg pb-2 justify-center space-x-6">
                        <button
                          onClick={() => {
                            if (quantity === 1) {
                              return;
                            }
                            setQuantity(quantity - 1);
                          }}
                          className="text-black text-lg hover:scale-125 outline-none"
                        >
                          -
                        </button>
                        <p className="font-semibold text-black">{quantity}</p>
                        <button
                          onClick={() => {
                            setQuantity(quantity + 1);
                          }}
                          className="text-black text-lg hover:scale-125 outline-none"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          addToOrder(name, newPrice, quantity, description);
                          setIsOpen(false);
                          setQuantity(1);
                        }}
                        className=" bg-amber-500 text-white p-2 w-full rounded-full"
                      >
                        {`aggiungi all'ordine ${price * quantity}€`}
                      </button>
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
