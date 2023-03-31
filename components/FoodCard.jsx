const FoodCard = (props) => {
  const { name, price, description, setIsOpen, setInfoCard, price_id } = props;
  return (
    <div
      onClick={() => {
        setIsOpen(true);
        setInfoCard({ name, price, description, price_id });
      }}
      className=" flex p-4 items-center justify-between  rounded-lg  border border-gray-200 cursor-pointer bg-white "
    >
      <div className="space-y-2">
        <p className="text-black font-semibold">{name}</p>
        <p className=" text-black text-sm">{description}</p>
        <p className=" text-black font-semibold">{`${price.toFixed(2)} €`}</p>
      </div>
    </div>
  );
};

export default FoodCard;
