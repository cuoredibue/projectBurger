import HeaderNavbar from "../../components/HeaderNavbar";
import BurgerList from "../../foodsAndDrinks/BurgerList";
import AddOrderMenu from "../../components/addOrderMenu";
import FoodCard from "../../components/FoodCard";
import Header from "../../components/Header";
import Drinks from "../../foodsAndDrinks/DrinksList";
import Dolci from "../../foodsAndDrinks/Dolci";
import BurgerMenu from "../../foodsAndDrinks/MenuBurgerList";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../index";
import FooterMessage from "../../components/FooterMessage";

const MenuCompleto = () => {
  const [activeSection, setActiveSection] = useState("burger");
  const [foodsDrinksList, setFoodsDrinksList] = useState(BurgerList);
  const [activeTitle, setActiveTitle] = useState("burger");
  const navbarRef = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  const [infoCard, setInfoCard] = useState({});
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
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
    <div className=" h-screen w-screen grid bg-black">
      <Header
        foodsDrinksList={foodsDrinksList}
        setFoodsDrinksList={setFoodsDrinksList}
        BurgerList={BurgerList}
      />

      <div className="grid gap-4 pb-4 grid-cols-1 bg-black px-4">
        <div ref={navbarRef} className="sticky top-0">
          <HeaderNavbar
            activeTitle={activeTitle}
            handleNavigation={handleNavigation}
          />
        </div>

        <div id="title-burger" className="h-8 bg-black text-white pl-4">
          burger
        </div>
        {BurgerList.map((item, index) => {
          const { name, price, description } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
              id="burger"
            />
          );
        })}
        <div id="title-menu" className="h-8 bg-black text-white pl-4">
          menu
        </div>
        {BurgerMenu.map((item, index) => {
          const { name, price, description, id } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
              id="menu"
            />
          );
        })}
        <div id="title-drinks" className="h-8 bg-black text-white pl-4">
          drinks
        </div>
        {Drinks.map((item, index) => {
          const { name, price, description, id } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
              id="drinks"
            />
          );
        })}
        <div id="title-dolci" className="h-8 bg-black text-white pl-4">
          dolci
        </div>
        {Dolci.map((item, index) => {
          const { name, price, description, id } = item;
          return (
            <FoodCard
              name={name}
              price={price}
              description={description}
              key={index}
              setIsOpen={setIsOpen}
              setInfoCard={setInfoCard}
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
