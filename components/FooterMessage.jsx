import Link from "next/link";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import { useEffect, useState } from "react";

const FooterMessage = (props) => {
  const { orderList } = props;
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
    <>
      <div
        onClick={() => {
          console.log(length);
        }}
        className="sm:hidden place-self-end sticky bottom-0 bg-amber-500 p-2 w-full "
      >
        <Link href="/payment/checkout">
          <div className="flex text-white items-center space-x-3">
            <div className="flex">
              <ShoppingBasketOutlinedIcon fontSize="large" />
              <div className="text-amber-500 flex justify-center items-center font-semibold text-xs h-5 w-5 bg-white border-2 border-amber-500 mt-1 -ml-2 rounded-full">
                {numberOfOrders}
              </div>
            </div>
            <div>
              <p className="font-semibold">{sumPrice}€</p>
              <p className=" text-sm font-thin">vai al carrello</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FooterMessage;
