import logo from "../images/logo.jpeg";

const Navbar = () => {
    return(
        <div className="flex h-4 mb-10 mt-3 items-center">
            <img src={logo} className="w-10 h-10" alt="news-logo" />
            <div className="text-xl font-bold ml-4">NEWS ROOM</div>
        </div>
    );
};

export default Navbar;