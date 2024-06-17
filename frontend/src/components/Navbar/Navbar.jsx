import { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { RiUserSmileFill } from "react-icons/ri";
import { MdMarkEmailUnread } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setisLoggedIn } from "../../utils/AuthSlice";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { myURL } from "../../utils/constants";

const Navbar = () => {
  const { getTotalCartValues, setCartItems } = useContext(StoreContext);
  const { totalCartItems } = getTotalCartValues();
  const [underline, setUnderline] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const total = useSelector((store) => store.menu.total);
  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      dispatch(setToken(tokenFromStorage));
      
    }
  }, [dispatch]);


  //getting user details
  const [loginUser,setLoginUser] = useState({});

  const useDetails =async()=> {
    const response = await axios.post(myURL + "/api/user/userdetails", {},{headers : {token}});
    if(response.data.success){
      console.log(response.data)
      setLoginUser(response.data.user);
    }
  }

    useEffect(() => {
      if (token) {
        useDetails();
      }
    },[token]);

  const Logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken("")); // Clear token in Redux store
    dispatch(setisLoggedIn(false)); // Update isLoggedIn in Redux store
    setLoginUser({})
    setCartItems({});
    navigate("/");
  };

  const handleClick = () => {
    dispatch(setisLoggedIn(true));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="bg-gradient fixed w-full z-50">
      <div className="flex py-4 md:py-8 gap-5 justify-between max-w-[1080px] mx-auto px-4 md:px-0">
        <Link to={"/"}>
          <img src={assets.logo} alt="Logo" className="w-32 md:w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-5 text-stone-950">
          <ul className="flex items-center gap-5 cursor-pointer">
            <Link
              to={"/"}
              onClick={() => setUnderline("home")}
              className={underline === "home" ? "active" : ""}
            >
              Home
            </Link>
            <Link
              to={"/menu"}
              href="#explore-menu"
              onClick={() => setUnderline("menu")}
              className={underline === "menu" ? "active" : ""}
            >
              Menu
            </Link>

            <Link
              to={"/myorders"}
              href=""
              onClick={() => setUnderline("about-us")}
              className={underline === "about-us" ? "active" : ""}
            >
              My orders
            </Link>
            <Link
              to={"/contactus"}
              href="#footer"
              onClick={() => setUnderline("contact-us")}
              className={underline === "contact-us" ? "active" : ""}
            >
              Contact us
            </Link>
          </ul>

          <div className="relative flex items-center gap-5">
            <img
              src={assets.search_icon}
              alt="Search"
              onClick={() => setUnderline("search")}
              className={underline === "search" ? "active" : ""}
            />
            <Link to={"/cart"}>
              <div className="relative p-2">
                <img
                  src={assets.bag_icon}
                  alt="Cart"
                  onClick={() => setUnderline("cart")}
                  className={underline === "cart" ? "active" : ""}
                />
                {totalCartItems > 0 && (
                  <span className="absolute -top-3 -right-1 bg-green-400 rounded-full px-2">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </Link>
            {!token ? (
              <button
                onClick={handleClick}
                className="py-2 px-4 text-white font-semibold bg-[#f54748] rounded-md border-2 border-stone-200 duration-100 hover:border-zinc-600"
              >
                Sign in
              </button>
            ) : (
              <>
                <div>{loginUser.name}</div>
                <div className="relative">
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    onClick={toggleProfileMenu}
                    className="cursor-pointer"
                  />
                  {isProfileMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-50 bg-white rounded-md shadow-lg">
                      <li className="flex gap-2 px-4 py-2 items-center cursor-text">
                        <RiUserSmileFill />
                        {loginUser.name}
                      </li>
                      <li className="flex gap-2 px-4 py-2 items-center cursor-text ">
                        <MdMarkEmailUnread />
                        {loginUser.email}
                      </li>
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <BsFillCartCheckFill />
                        <Link to={"/myorders"}>Orders</Link>
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={Logout}
                      >
                        <IoLogOut />
                        <span>Logout</span>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            <img src={assets.hamburger} alt="Menu" className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gradient p-4 gap-5 text-stone-950">
          <ul className="flex flex-col items-center gap-5 cursor-pointer">
            <Link
              to={"/"}
              onClick={() => {
                setUnderline("home");
                setIsMobileMenuOpen(false);
              }}
              className={underline === "home" ? "active" : ""}
            >
              Home
            </Link>
            <Link
              to={"/menu"}
              onClick={() => {
                setUnderline("menu");
                setIsMobileMenuOpen(false);
              }}
              className={underline === "menu" ? "active" : ""}
            >
              Menu
            </Link>
          </ul>

          <div className="flex flex-col items-center gap-5">
            <Link to={"/cart"} onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative p-2">
                <img src={assets.bag_icon} alt="Cart" className="w-6 h-6" />
                {total > 0 && (
                  <span className="absolute -top-3 -right-1 bg-green-400 rounded-full px-2">
                    {total}
                  </span>
                )}
              </div>
            </Link>
            {!token ? (
              <button
                onClick={() => {
                  handleClick();
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-4 text-white font-semibold bg-[#f54748] rounded-md border-2 border-stone-200 duration-100 hover:border-zinc-600"
              >
                Sign in
              </button>
            ) : (
              <div className="flex gap-5">
                <div>{loginUser.name}</div>
                <div className="relative">
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    onClick={toggleProfileMenu}
                    className="cursor-pointer"
                  />
                  {isProfileMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <li className="flex gap-2 px-4 py-2 items-center cursor-text">
                        <RiUserSmileFill />
                        {loginUser.name}
                      </li>
                      <li className="flex gap-2 px-4 py-2 items-center cursor-text ">
                        <MdMarkEmailUnread />
                        {loginUser.email}
                      </li>
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <BsFillCartCheckFill />
                        <Link to={"/myorders"}>Orders</Link>
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={Logout}
                      >
                        <IoLogOut />
                        <span>Logout</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
