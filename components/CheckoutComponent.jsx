import { useEffect, useState } from "react";
import { supabase } from "../pages";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutComponent = (props) => {
  const {
    orderList,
    setIsOpen,
    setInfoCard,
    setModifyOrder,
    pageIsLoad,
    setPageIsLoad,
  } = props;
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [sumPrice, setSumPrice] = useState(null);
  const [numberOfOrders, setNumberOfOrders] = useState(null);
  let length = orderList.length;

  const prepareToCheckout = () => {
    let list = orderList.map((item) => {
      return { price: item.price_id, quantity: item.quantity };
    });
    setCheckoutItems(list);
    setPageIsLoad(false);
  };
  useEffect(() => {
    prepareToCheckout();
  }, [pageIsLoad]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

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
    <div className="shadow mx-6 bg-white">
      <div className="  flex justify-between p-4 text-2xl font-semibold bg-white">
        <p>Il tuo ordine</p>
        <p>{`${sumPrice}€`}</p>
      </div>

      <div className="bg-white sticky  col-span-1 overflow-auto top-0 h-screen">
        <form
          action="/api/checkout_session"
          method="POST"
          className="h-20 p-2 flex justify-center items-center shadow-md sticky top-0 bg-white"
        >
          <input
            type="hidden"
            name="obj"
            value={JSON.stringify(checkoutItems)}
          />
          <button
            type="submit"
            role="link"
            className="p-5 bg-amber-500 w-full text-white text-lg rounded-full text-center "
          >
            vai al pagamento
          </button>
        </form>
        {orderList.map((item) => {
          const { name, price, quantity, description, price_id } = item;
          const singleItemPrice = price / quantity;

          return (
            <div className="p-8 space-x-4 justify-between flex">
              <div>
                <p className="">x{quantity}</p>
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
        <div className="flex justify-between font-semibold px-8 items-center sticky w-full bottom-0 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]  bg-white h-14">
          <p>Totale</p>
          <p>{`${sumPrice} €`}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
