import NavBar from "./NavBar";

const Header = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p>expense-accounting-panel</p>
      <NavBar />
    </div>
  );
};

export default Header;
