import Nav from "./Nav";
import Logo from "../icons/Logo.svg";
import Basket from "../icons/Basket.svg";

const socials = [
  {
    icon: Logo,
    url: "./",
  },
  {
    icon: Basket,
    url: "./booking",
  },
];

function Header() {
  return (
    <header>
      <Nav data={socials}/>
    </header>
  );
}

export default Header;
