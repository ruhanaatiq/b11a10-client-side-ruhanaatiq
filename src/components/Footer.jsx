import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-orange-500 text-white p-10">
      {/* Logo + About */}
      <aside>
        <img src={logo} alt="Recipe Book Logo" className="w-12 h-12 rounded" />
        <p>
          <span className="font-bold text-lg">Recipe Book</span>
          <br />
          Delicious ideas since 2016
        </p>
      </aside>

      {/* Navigation: Explore */}
      <nav>
        <h6 className="footer-title">Explore</h6>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/recipes" className="link link-hover">All Recipes</Link>
        <Link to="/add-recipe" className="link link-hover">Add Recipe</Link>
        <Link to="/dashboard" className="link link-hover">Dashboard</Link>
      </nav>

      {/* Navigation: Account */}
      <nav>
        <h6 className="footer-title">My Account</h6>
        <Link to="/my-recipes" className="link link-hover">My Recipes</Link>
        <Link to="/login" className="link link-hover">Login</Link>
        <Link to="/register" className="link link-hover">Register</Link>
      </nav>

      {/* Social Links */}
      <nav>
        <h6 className="footer-title">Follow Us</h6>
        <div className="grid grid-flow-col gap-4 mt-2">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.384 4.482C7.691 8.548 4.066 6.13 1.64 2.87a4.822 4.822 0 0 0-.666 2.475c0 1.708.869 3.215 2.188 4.096A4.904 4.904 0 0 1 .96 8.1v.062a4.919 4.919 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.084A4.936 4.936 0 0 0 6.29 17.29a9.867 9.867 0 0 1-6.102 2.105c-.396 0-.787-.023-1.17-.069a13.945 13.945 0 0 0 7.548 2.212c9.142 0 14.307-7.721 14.307-14.426 0-.22-.005-.439-.014-.657A10.243 10.243 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M19.615 3.184C16.01 2.938 7.984 2.937 4.385 3.184 0.488 3.45 0.029 5.804 0 12c0 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 15.999v-8l8 4.007-8 3.993z" />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
              <path d="M22 0H2C.896 0 0 .896 0 2v20c0 1.104.896 2 2 2h10V14h-3v-4h3V7c0-3.313 2.687-6 6-6h3v4h-3c-.553 0-1 .448-1 1v3h4l-1 4h-3v10h5c1.104 0 2-.896 2-2V2c0-1.104-.896-2-2-2z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
