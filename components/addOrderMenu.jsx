import { Dialog } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const AddOrderMenu = (props) => {
  const { isOpen, setIsOpen, infoCard, addToOrder } = props;
  const { name, description, price } = infoCard;
  const [quantity, setQuantity] = useState(1);
  const newPrice = price * quantity;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setQuantity(1);
        }}
      >
        <div className="fixed bottom-0 bg-white w-screen rounded-t-2xl  text-center">
          <div className="space-y-2 p-4">
            <div>
              <div className="flex justify-center">
                <p className=" font-semibold grow -mr-4 ">{name}</p>
                <div
                  className=""
                  onClick={() => {
                    setIsOpen(false);
                    setQuantity(1);
                  }}
                >
                  <CloseIcon />
                </div>
              </div>

              <p className="font-semibold "> {price} €</p>
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
                className="text-orange-500 hover:scale-125 outline-none"
              >
                -
              </button>
              <p className="font-semibold">{quantity}</p>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                className="text-orange-500 hover:scale-125 outline-none"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToOrder(name, newPrice, quantity);
                setIsOpen(false);
                setQuantity(1);
              }}
              className=" bg-orange-500 text-white p-2 w-full rounded-full"
            >
              {`aggiungi all'ordine ${price * quantity}€`}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddOrderMenu;
