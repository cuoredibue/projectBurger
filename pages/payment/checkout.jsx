import Link from "next/link";
import BasketIcon from "../../images/basketIcon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { supabase } from "..";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const [orderList, setOrderList] = useState([]);
  const [sumPrice, setSumPrice] = useState(null);
  const [pageIsLoad, setPageIsLoad] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("order")
      .select()
      .order("name", { ascending: true });
    if (error) {
      console.log(error);
    }
    if (data) {
      setOrderList(data);
    }
    setPageIsLoad(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const prepareToCheckout = () => {
    let list = orderList.map((item) => {
      return { price: item.price_id, quantity: item.quantity };
    });
    setCheckoutItems(list);
  };
  useEffect(() => {
    prepareToCheckout();
  }, [pageIsLoad]);

  const sumOrders = () => {
    const prices = orderList.map((item) => {
      return item.price;
    });

    const quantities = orderList.map((item) => {
      return item.quantity;
    });

    const priceSum = prices.reduce((a, b) => a + b, 0);
    setSumPrice(priceSum);
  };

  useEffect(() => {
    sumOrders();
  }, [orderList]);

  const addQuantity = async (name, quantity, price) => {
    const singleItemPrice = price / quantity;

    const newQuantity = quantity + 1;
    const newPrice = singleItemPrice * newQuantity;
    const { error } = await supabase
      .from("order")
      .update({ quantity: newQuantity, price: newPrice })
      .eq("name", name);
    if (error) {
      console.log(error);
    }
    fetchData();
  };

  const reduceQuantity = async (name, quantity, price) => {
    if (quantity === 1) {
      return;
    }
    const singleItemPrice = price / quantity;

    const newQuantity = quantity - 1;
    const newPrice = singleItemPrice * newQuantity;
    const { error } = await supabase
      .from("order")
      .update({ quantity: newQuantity, price: newPrice })
      .eq("name", name);
    if (error) {
      console.log(error);
    }
    fetchData();
  };

  const removeItem = async (name) => {
    const { error } = await supabase.from("order").delete().eq("name", name);

    if (error) {
      console.log(error);
    }
    fetchData();
  };
  return (
    <div className="h-screen ">
      <div className="flex  bg-white justify-between items-center h-14 shadow w-screen  px-4">
        <Link href="/orderNow/menuCompleto" className="text-gray-400">
          <ArrowBackIosNewOutlinedIcon />
        </Link>
        <div className="flex space-x-2">
          <LocalGroceryStoreOutlinedIcon />
          <p className="mr-2 text-lg">Il tuo ordine</p>
        </div>
      </div>
      {pageIsLoad === false && <div className="h-screen w-screen "></div>}
      <div className="w-full   space-y-2 pb-28">
        {orderList.map((item, index) => {
          const { name, quantity, price, price_id } = item;
          const checkoutItems = { price: price_id, quantity };

          return (
            <div
              key={price_id}
              className="h-10 w-screen flex items-center justify-between pl-1"
            >
              <div className="flex items-center space-x-2">
                <div
                  onClick={() => {
                    addQuantity(name, quantity, price);
                  }}
                >
                  +
                </div>
                <div className="h-6 w-6 bg-slate-200 rounded-full flex justify-center items-center">
                  {quantity}
                </div>
                <div
                  onClick={() => {
                    reduceQuantity(name, quantity, price);
                  }}
                >
                  -
                </div>
                <p className="px-4">{name}</p>
              </div>

              <div>
                {`${price.toFixed(2)}€`}
                <DeleteOutlinedIcon
                  className="text-red-500 pb-1"
                  onClick={() => {
                    removeItem(name);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {orderList.length > 0 && (
        // Passo come checkoutItems convertito col metodo .strigify()
        <form action="/api/checkout_session" method="POST">
          <div className="fixed bottom-0 bg-white space-y-4 p-4 w-full shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]">
            <p>{`Totale: ${sumPrice}€`}</p>
            <input
              type="hidden"
              name="obj"
              value={JSON.stringify(checkoutItems)}
            />

            <button
              type="submit"
              role="link"
              className=" h-10 w-full  rounded bg-amber-500 flex justify-center items-center text-white"
            >
              vai al pagamento
            </button>
          </div>
        </form>
      )}

      {orderList.length === 0 && (
        <div>
          <div className="flex mt-14 mb-4 justify-center">
            <BasketIcon />
          </div>
          <p className=" text-center">Il carrello è vuoto</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
