import logo from "./images/logo.svg";

const headerStyle = {
  fontSize: 30,
  fontWeight: "bold",
  color: "white",
  borderBottom: "1px solid white",
  padding: 15,
};

export default function Header() {
  return (
    <div style={headerStyle}>
      <img src={logo} style={{ height: "45px", marginRight: "1em" }}></img>
      <span>React Course - Cyclopedia</span>
    </div>
  );
}
