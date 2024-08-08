import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, SignUpPage } from "./pages";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-800 size-20' />
				</div>
			</div>
		);
	}

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={'/'}/>} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'}/>} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={'/login'}/>} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
