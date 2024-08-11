import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();

  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/")
  }

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50 px-5">
        <Link to="/">
          <Logo />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to="/" className={`${contentType === 'movie' ? "underline underline-offset-2" : "hover:underline"}`} onClick={() => setContentType('movie')}>
            Movies
          </Link>
          <Link to="/" className={`${contentType === 'tv' ? "underline underline-offset-2 hover" : "hover:underline"}`} onClick={() => setContentType('tv')}>
            Tv Shows
          </Link>
          <Link to="/history" className={`${contentType === null ? "underline underline-offset-2" : "hover:underline"}`} onClick={() => setContentType(null)}>
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user?.image || '/assets/avatar3.png'}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={handleLogout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full h-screen flex flex-col justify-start px-4 sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};
export default Navbar;
