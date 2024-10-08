import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuthStore } from "../store/authUser";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guest, setGuest] =useState(
    {
      email: "guest@netview.com",
      password: 'guest24'
    }
  )
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleLoginGuest = () => {
    setGuest(guest)
    login(guest)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <Logo />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-15 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Login
          </h1>

          <form className="space-y-4" onSubmit={guest ? handleLoginGuest : handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <Eye
                  size={24}
                  className="text-white  absolute cursor-pointer top-1/2 right-4 "
                  onClick={handleClickShowPassword}
                />
              ) : (
                <EyeOff
                  size={24}
                  className="text-white absolute cursor-pointer top-1/2 right-4"
                  onClick={handleClickShowPassword}
                />
              )}
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						"
              disabled={guest && isLoggingIn}
              onClick={handleLogin}
            >
              {isLoggingIn || guest ? "Login" : "Loading..."}
            </button>

            <button
              className="w-full py-2 bg-gray-500 text-black font-semibold rounded-md
							hover:bg-gray-700
						"
              disabled={isLoggingIn}
              onClick={handleLoginGuest}
            >
              {isLoggingIn ? "Loading..." : "Login as Guest"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
