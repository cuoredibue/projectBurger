import { useEffect, useState, useRef } from "react";
import { supabase } from "../index";
import Image from "next/image";
import burgerImage from "../../images/burgerOrder.jpg";

// components
import HeaderNavbar from "../../components/HeaderNavbar";
import AddOrderMenu from "../../components/addOrderMenu";
import FoodCard from "../../components/FoodCard";
import Header from "../../components/Header";
import FooterMessage from "../../components/FooterMessage";
import { Fullscreen } from "@mui/icons-material";

const MenuCompleto = () => {
  const [activeSection, setActiveSection] = useState("burger");
  const [activeTitle, setActiveTitle] = useState("burger");
  const navbarRef = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  const [infoCard, setInfoCard] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [burgerList, setBurgerList] = useState([]);
  const [comboBurgerList, setComboMenuList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [dolciList, setDolciList] = useState([]);
  const databaseList = ["order", "burger", "comboMenu", "drinks", "dolci"];

  // imposte le liste con i dati presenti nel database
  const fetchData = async (database) => {
    const { data, error } = await supabase.from(database).select();
    if (data) {
      {
        database === "burger" && setBurgerList(data);
      }
      {
        database === "order" && setOrderList(data);
      }
      {
        database === "comboMenu" && setComboMenuList(data);
      }
      {
        database === "drinks" && setDrinksList(data);
      }
      {
        database === "dolci" && setDolciList(data);
      }
    }
    if (error) {
      console.log(error);
    }
  };

  const fetchAllTable = async () => {
    databaseList.map((database) => {
      fetchData(database);
    });
  };

  useEffect(() => {
    fetchAllTable();
  }, []);

  // questa parte riguarda la navigazione nella lista attraverso i bottoni nella navbar
  const handleNavigation = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element.scrollIntoView({ behavior: "smooth" });
  };

  //modifico stile di un bottone nella navbar a seconda della sezione della lista in cui ci si trova
  //il pattern sarà quando il titolo di una sezione toccherà il punto più alto dello schermo
  function updateActiveTitle() {
    const sections = ["burger", "menu", "drinks", "dolci"];
    const titles = sections.map((section) =>
      document.getElementById(`title-${section}`)
    );
    // aggiungo questa condizione perchè a volte mi dava errore se caricavo un'altra pagina
    if (navbarRef.current !== null) {
      const navbarHeight = navbarRef.current.offsetHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop; //per una questione di compatibilità anche coi browser più vecchi
      let newActiveTitle = "";
      titles.forEach((title) => {
        if (title.offsetTop - navbarHeight <= scrollTop) {
          newActiveTitle = title.textContent;
        }
      });

      setActiveTitle(newActiveTitle);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", updateActiveTitle);
    return () => {
      window.removeEventListener("scroll", updateActiveTitle);
    };
  }, []);

  // prima d'aggiungere una nuova riga nel database, verifico che non ne esista nessuna con lo stesso "name"
  const addToOrder = async (name, price, quantity, description, price_id) => {
    const { data: previousData, error } = await supabase
      .from("order")
      .select()
      .eq("name", name)
      .single();

    if (error) {
      console.log(error);
    }

    if (previousData) {
      const newQuantity = quantity + previousData.quantity;
      const newPrice = price + previousData.price;
      const { data, error } = await supabase.from("order").upsert({
        id: previousData.id,
        name,
        price: newPrice,
        quantity: newQuantity,
      });
      if (error) {
        console.log(error);
      }
    }

    if (!previousData) {
      const { data, error } = await supabase
        .from("order")
        .insert({ name, quantity, price, description, price_id });
      if (error) {
        console.log(error);
      }
    }

    fetchData("order");
  };

  return (
    <div className=" h-screen w-screen grid bg-white">
      <Header />
      <Image src={burgerImage} alt="burger" className="h-42" />

      <div className="grid gap-4 pb-4 grid-cols-1 bg-white px-4">
        <div ref={navbarRef} className="sticky top-0">
          <HeaderNavbar
            activeTitle={activeTitle}
            handleNavigation={handleNavigation}
          />
        </div>

        <div id="title-burger" className="h-8 bg-white text-black pl-4">
          burger
        </div>
        <div
          className={
            (burgerList.length === 0 && "h-screen w-full bg-white") ||
            "space-y-4 bg-white"
          }
        >
          {burgerList.map((item, index) => {
            const { name, price, description, price_id } = item;
            return (
              <FoodCard
                name={name}
                price={price}
                description={description}
                key={index}
                setIsOpen={setIsOpen}
                setInfoCard={setInfoCard}
                price_id={price_id}
                id="burger"
              />
            );
          })}
        </div>
        <div id="title-menu" className="h-8 bg-white text-black  pl-4">
          menu
        </div>

        {comboBurgerList.map((item, index) => {
          const { name, price, description, price_id } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
              price_id={price_id}
              id="menu"
            />
          );
        })}

        <div id="title-drinks" className="h-8 bg-white text-black  pl-4">
          drinks
        </div>
        {drinksList.map((item, index) => {
          const { name, price, description, price_id } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
              price_id={price_id}
              id="drinks"
            />
          );
        })}
        <div id="title-dolci" className="h-8 bg-white text-black  pl-4">
          dolci
        </div>
        {dolciList.map((item, index) => {
          const { name, price, description, price_id } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
              price_id={price_id}
              id="dolci"
            />
          );
        })}
      </div>
      <AddOrderMenu
        infoCard={infoCard}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addToOrder={addToOrder}
      />

      {orderList.length > 0 && <FooterMessage orderList={orderList} />}
    </div>
  );
};

export default MenuCompleto;
