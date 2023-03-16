const FoodCard = (props) => {
  const { name, price, description, setIsOpen, setInfoCard } = props;
  return (
    <div
      onClick={() => {
        setIsOpen(true);
        setInfoCard({ name, price, description });
      }}
      className=" flex p-4 items-center justify-between  rounded-lg  bg-gray-700/50 "
    >
      <div className="space-y-2">
        <p className="text-gray-200 ">{name}</p>
        <p className=" text-gray-500">{description}</p>
        <p className=" text-gray-200 ">{`${price.toFixed(2)} €`}</p>
      </div>
    </div>
  );
};

export default FoodCard;
