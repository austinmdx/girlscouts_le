import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { DATA } from "../../utils/data";
import HomeCard from "../../components/screens/Home/Card";

const HomePage = () => {
  const { password } = useAuth();

  if (!password) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full p-5 md:p-10">
      <div className="grid lg:gap-10 lg:grid-cols-4 gap-5 md:grid-cols-3 grid-cols-2">
        {DATA.map((item) => (
          <HomeCard item={item} key={item.id}></HomeCard>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
