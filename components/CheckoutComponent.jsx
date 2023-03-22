import { useEffect, useState } from "react";
import { supabase } from "../pages";

const CheckoutComponent = (props) => {
  const { orderList, setIsOpen, setInfoCard, setModifyOrder } = props;

  const [sumPrice, setSumPrice] = useState(null);
  const [numberOfOrders, setNumberOfOrders] = useState(null);
  let length = orderList.length;

  const sumOrders = () => {
    const prices = orderList.map((item) => {
      return item.price;
    });

    const quantities = orderList.map((item) => {
      return item.quantity;
    });

    const priceSum = prices.reduce((a, b) => a + b, 0);
    setSumPrice(priceSum);

    const quantitiesSum = quantities.reduce((a, b) => a + b, 0);
    setNumberOfOrders(quantitiesSum);
  };

  useEffect(() => {
    sumOrders();
  }, [orderList]);

  return (
    <div className="shadow bg-white">
      <div className="h-14 shadow sticky top-0 bg-white">
        {" "}
        {`Totale ${sumPrice}`}
      </div>
      <div className="h-20 flex justify-center items-center shadow sticky top-0 bg-white">
        <div className="p-6 bg-amber-500 text-white text-lg rounded-full text-center ">
          vai al pagamento
        </div>
      </div>
      <div className="bg-white sticky col-span-1 overflow-auto top-20 h-screen pb-24">
        {orderList.map((item) => {
          const { name, price, quantity, description, price_id } = item;
          const singleItemPrice = price / quantity;
          return (
            <div className="p-8 space-x-4 justify-between  flex">
              <p className="">x{quantity}</p>

              <div>
                <p
                  onClick={() => {
                    setModifyOrder(true);
                    setIsOpen(true);
                    setInfoCard({
                      name,
                      price,
                      description,
                      price_id,
                      singleItemPrice,
                      price,
                      quantity,
                    });
                  }}
                  className="underline"
                >
                  {name}
                </p>
                <p>{description}</p>
              </div>
              <p>{`${price}€`}</p>
            </div>
          );
        })}
      </div>
      <div className=" fixed w-full bottom-0 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]  bg-white h-14">
        {`Totale ${sumPrice}`}
      </div>
    </div>
  );
};

export default CheckoutComponent;
