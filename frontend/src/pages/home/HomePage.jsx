import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <>
      <main>{user ? <HomeScreen /> : <AuthScreen />}</main>
    </>
  );
};

export default HomePage;
