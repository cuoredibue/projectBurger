import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "..";
import AddOrderMenu from "../../components/addOrderMenu";
import BurgerList from "../../foodsAndDrinks/BurgerList";
import Dolci from "../../foodsAndDrinks/Dolci";
import BurgerMenu from "../../foodsAndDrinks/MenuBurgerList";
import Drinks from "../../foodsAndDrinks/DrinksList";
import FooterMessage from "../../components/FooterMessage";

const SearchPage = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilterdList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [infoCard, setInfoCard] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [itemNotFound, setItemNotFound] = useState(null);

  const handleLists = () => {
    let finalList = [];
    finalList = BurgerList.concat(BurgerMenu, Drinks, Dolci);
    setList(finalList);
  };

  useEffect(() => {
    handleLists();
    fetchData();
  }, []);

  // controllo nel database se sono ci stati degli ordini non ancora conclusi
  const fetchData = async () => {
    const { data, error } = await supabase.from("order").select();
    if (error) {
      console.log(error);
    }
    if (data) {
      setOrderList(data);
    }
  };

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
    } else {
      console.log("inserted data");
    }
    fetchData();
  };

  return (
    <div className="">
      <div className="flex shadow h-10 items-center space-x-2 ">
        <Link href="/orderNow/menuCompleto">
          <div>back</div>
        </Link>
        <input
          autoFocus
          onChange={(e) => {
            setInputValue(e.target.value.toLocaleLowerCase());
          }}
          value={inputValue}
          className="bg-gray-200 h-8 p-2 w-screen focus:outline-none "
          placeholder="Cerca nel menu "
          type="text"
        />
      </div>
      {inputValue !== "" && (
        <ul>
          {filteredList.map((item, index) => {
            const { name, price, description } = item;
            return (
              <li
                onClick={() => {
                  setIsOpen(true);
                  setInfoCard({ name, price, description });
                }}
                key={index}
              >
                {name}
              </li>
            );
          })}
        </ul>
      )}
      {itemNotFound !== null && <p>{itemNotFound}</p>}
      <AddOrderMenu
        infoCard={infoCard}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addToOrder={addToOrder}
      />
      <div className="absolute bottom-0 w-screen">
        {orderList.length > 0 && <FooterMessage orderList={orderList} />}
      </div>
    </div>
  );
};

export default SearchPage;
