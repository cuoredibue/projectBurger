import BottomBar from "../../components/BottomBar";
import Header from "../../components/Header";
import MapComponent from "../../components/Map";

const DoveSiamo = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <Header />
      <MapComponent />
      <BottomBar />
    </div>
  );
};

export default DoveSiamo;
