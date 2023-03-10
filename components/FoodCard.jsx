import { CabinOutlined } from "@mui/icons-material";
import Image from "next/image";

const FoodCard = (props) => {
  const { name, img } = props;
  return (
    <div className="text-center">
      <Image src={img} width={200} height={200} alt="burger" />
      <p className="text-gray-300">{name}</p>
    </div>
  );
};

export default FoodCard;
