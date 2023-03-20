import Link from "next/link";
import BasketIcon from "../../images/basketIcon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { supabase } from "..";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [orderList, setOrderList] = useState([]);
  const [sumPrice, setSumPrice] = useState(null);
  const [pageIsLoad, setPageIsLoad] = useState(false);

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
    <div className="h-screen ">
      <div className="flex justify-between items-center h-14 shadow w-screen px-4">
        <Link href="/orderNow/menuCompleto" className="text-gray-400">
          <ArrowBackIosNewOutlinedIcon />
        </Link>
        <div className="flex space-x-2">
          <LocalGroceryStoreOutlinedIcon />
          <p className="mr-2 text-lg">Il tuo ordine</p>
        </div>
      </div>
      {pageIsLoad === false && <div className="h-screen w-screen "></div>}
      <div className="w-full space-y-2 pb-28">
        {orderList.map((item, index) => {
          const { name, quantity, price, description } = item;
          return (
            <div className="h-10 w-screen  flex items-center justify-between shadow-sm pl-1">
              <div className="flex  items-center space-x-2">
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
        <div className="fixed bottom-0 bg-white space-y-4 p-4 w-full shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]">
          <p>{`Totale: ${sumPrice}€`}</p>
          <div className=" h-10  rounded bg-amber-500 flex justify-center items-center text-white">
            vai al pagamento
          </div>
        </div>
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

// <div className="table-header-group">
// <div className="table-row text-gray-500 text-xs font-semibold ">
//   <div
//     onClick={() => {
//       setOrder("name");
//     }}
//     className="table-cell  "
//   >
//     Quantità
//   </div>
//   <div
//     onClick={() => {
//       setOrder("quantity");
//     }}
//     className="table-cell px-4"
//   >
//     Nome
//   </div>
//   <div
//     onClick={() => {
//       setOrder("date");
//     }}
//     className="table-cell text-center "
//   >
//     Prezzo €
//   </div>
// </div>
// </div>

// <div key={index} className="table-row ">
//   <div className="table-cell  border-t">
//     <div className="flex items-center space-x-2 ">
//       <div
//         className="flex justify-center items-center h-4 w-4  bg-gray-200 rounded-full text-lg"
//         onClick={() => {
//           addQuantity(name, quantity, price);
//         }}
//       >
//         <AddIcon fontSize="small" />
//       </div>
//       <div className="flex justify-center items-center h-7 w-7 bg-gray-200 rounded-full">
//         {quantity}
//       </div>
//       <div
//         className="flex justify-center items-center h-4 w-4  bg-gray-200 rounded-full"
//         onClick={() => {
//           reduceQuantity(name, quantity, price);
//         }}
//       >
//         <RemoveIcon fontSize="small" />
//       </div>
//     </div>
//   </div>

//   <div className="teble-cell p-4 border-t">
//     <p className=" ">{name}</p>
//   </div>

//   <div className="table-cell border-t  text-center">
//     <div>{`${price.toFixed(2)}`}</div>
//   </div>
//   <div
//     onClick={() => {
//       removeItem(name);
//     }}
//     className="table-cell border-t text-right"
//   >
//     <DeleteOutlinedIcon fontSize="small" className="mb-1 ml-1" />
//   </div>
// </div>
