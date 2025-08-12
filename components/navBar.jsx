import Link from "next/link";

const NavBar = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Link href="/">
        <p>Главная</p>
      </Link>
      <Link href="/add">
        <p>Добавление расхода</p>
      </Link>
      <Link href="/dashboard">
        <p>Главная панель</p>
      </Link>
      <Link href="/list">
        <p>Список расходов</p>
      </Link>
      <Link href="/login">
        <p>Вход</p>
      </Link>
      <Link href="/settings">
        <p>Настройки</p>
      </Link>
      <Link href="/stats">
        <p>Статистика</p>
      </Link>
    </div>
  );
};

export default NavBar;
