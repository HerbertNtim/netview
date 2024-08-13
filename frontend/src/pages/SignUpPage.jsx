import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuthStore } from "../store/authUser";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const { searchParams } = new URL(window.location);
  const emailValue = searchParams.get("email");
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp, authCheck } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  

  return (
    <section className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto p-4">
        <Link to={"/"}>
          <Logo />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-0 mx-3">
        <div className="w-full max-w-md p-6 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
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

            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="hntim"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						'
							disabled={isSigningUp}
						>
							{isSigningUp ? "Loading..." && authCheck() : "Login"}
						</button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUpPage;
