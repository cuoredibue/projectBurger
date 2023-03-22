import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "..";
import AddOrderMenu from "../../components/addOrderMenu";
import FooterMessage from "../../components/FooterMessage";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const SearchPage = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilterdList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [infoCard, setInfoCard] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [itemNotFound, setItemNotFound] = useState(null);
  const databaseList = ["order", "menuCompleto"];

  const fetchData = async (database) => {
    const { data, error } = await supabase.from(database).select();
    if (data) {
      {
        database === "menuCompleto" && setList(data);
      }
      {
        database === "order" && setOrderList(data);
      }
    }
    if (error) {
      console.log(error);
    }
  };

  const fetchAllTable = () => {
    databaseList.map((database) => {
      fetchData(database);
    });
  };

  useEffect(() => {
    fetchAllTable();
  }, []);

  const setName = () => {
    if (!inputValue) {
      return;
    }
    const value = list.filter((item) => {
      return item.name.toLowerCase().includes(inputValue);
    });
    if (value.length === 0) {
      setItemNotFound(`nessun risultato per "${inputValue}"`);
      setFilterdList(value);
    } else {
      setItemNotFound(null);
      setFilterdList(value);
    }
  };

  useEffect(() => {
    setName();
  }, [inputValue]);

  const addToOrder = async (name, price, quantity) => {
    const { error } = await supabase
      .from("order")
      .insert({ name, price, quantity });

    if (error) {
      console.log(error);
    }
    fetchData("order");
  };

  return (
    <div className="">
      <div className="flex shadow h-10 items-center space-x-2 ">
        <Link href="/orderNow/menuCompleto">
          <ArrowBackIosNewOutlinedIcon className="text-gray-400" />
        </Link>
        <input
          autoFocus
          onChange={(e) => {
            setInputValue(e.target.value.toLocaleLowerCase());
          }}
          value={inputValue}
          className="bg-white h-10 p-2 w-screen focus:outline-none "
          placeholder="Cerca nel menu "
          type="text"
        />
      </div>
      {itemNotFound !== null && <div className=" p-2">{itemNotFound}</div>}
      {inputValue !== "" && (
        <div className=" space-y-2 pb-14">
          {filteredList.map((item, index) => {
            const { name, price, description } = item;
            // divido in tre parti il nome per potere applicare uno stile personalizzato alla parte equivalente all'input che si digita
            // col method .indexOf() trovo la posizione del input value nella stringa, poi la divido col method .slice()
            const newName = name.toLowerCase();
            const inputValuePosition = newName.indexOf(inputValue);
            const namePart1 = newName.slice(0, inputValuePosition);
            const namePart2 = inputValue;
            const namePart3 = newName.slice(
              inputValuePosition + inputValue.length
            );

            return (
              <div
                key={index}
                onClick={() => {
                  setIsOpen(true);
                  setInfoCard({ name, price, description });
                }}
                className="p-2 shadow"
              >
                <div className="flex font-semibold text-lg">
                  <p>{namePart1}</p>
                  <p className=" bg-yellow-400 rounded-full">{namePart2}</p>
                  <p>{namePart3}</p>
                </div>
                <div>
                  <p>{description}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{`${price}€`}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AddOrderMenu
        infoCard={infoCard}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addToOrder={addToOrder}
      />
      <div className="fixed w-screen bottom-0 ">
        {orderList.length > 0 && <FooterMessage orderList={orderList} />}
      </div>
    </div>
  );
};

export default SearchPage;
