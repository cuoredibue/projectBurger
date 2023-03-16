import Link from "next/link";
import BasketIcon from "../../images/basketIcon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { supabase } from "..";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [orderList, setOrderList] = useState([]);
  const [sumPrice, setSumPrice] = useState(null);

  const fetchData = async () => {
    const { data, error } = await supabase.from("order").select();
    if (error) {
      console.log(error);
    }
    if (data) {
      setOrderList(data);
    }
  };

  useEffect(() => {
    fetchData();
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
    const { data, error } = await supabase
      .from("order")
      .delete()
      .eq("name", name);

    if (error) {
      console.log(error);
    }
    fetchData();
  };
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-14 shadow w-screen px-4">
        <Link href="/orderNow/menuCompleto" className="grow  text-gray-400">
          <ArrowBackIosNewOutlinedIcon />
        </Link>

        <p className="grow mr-6">il tuo ordine</p>
      </div>
      <div className="table w-screen mt-10 p-4">
        <div className="table-row-group">
          {orderList.map((item, index) => {
            const { name, quantity, price } = item;
            return (
              <div key={index} className="table-row">
                <div className="table-cell border-t">
                  <div className="flex items-center space-x-4 ">
                    <p
                      onClick={() => {
                        addQuantity(name, quantity, price);
                      }}
                    >
                      +
                    </p>
                    <div className="flex justify-center items-center h-5 w-5 bg-gray-200 rounded-full">
                      {quantity}
                    </div>
                    <p
                      onClick={() => {
                        reduceQuantity(name, quantity, price);
                      }}
                    >
                      -
                    </p>
                  </div>
                </div>

                <div className="teble-cell border-t">
                  <p className=" underline underline-offset-1">{name}</p>
                </div>

                <div className="table-cell border-t text-right">
                  <div>{`${price.toFixed(2)} €`}</div>
                </div>
                <div
                  onClick={() => {
                    removeItem(name);
                  }}
                  className="table-cell border-t text-right"
                >
                  <DeleteOutlinedIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p>{`subtotale${sumPrice}`}</p>
      </div>
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
