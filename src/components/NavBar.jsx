import Link from "next/link";
import Button from "./UI/Button";
import classes from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <div className={`text-body ${classes.navbar}`}>
      <img src="/images/logo.png" width="192px" alt="Logo" />

      <div className={classes.navMenu}>
        <Link href="/dashboard" className={classes.item}>
          <img src="/svg/Dashboard.svg" alt="Dashboard icon" />
          <p>Dashboard</p>
        </Link>
        <Link href="/list" className={classes.item}>
          <img src="/svg/AllExpenses.svg" alt="All expenses icon" />
          <p>All expenses</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/Limit.svg" alt="Limit icon" />
          <p>Limit</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/TotalBalance.svg" alt="Total balance icon" />
          <p>Total balance</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/Analytics.svg" alt="Analytics icon" />
          <p>Analytics</p>
        </Link>
        <Link href="/stats" className={classes.item}>
          <img src="/svg/Statistics.svg" alt="Statistics icon" />
          <p>Statistics</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/Categories.svg" alt="Categories icon" />
          <p>Categories</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/Transactions.svg" alt="Transactions icon" />
          <p>Transactions</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/Profile.svg" alt="Profile icon" />
          <p>Profile</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/Help.svg" alt="Help icon" />
          <p>Help</p>
        </Link>
      </div>
      <button>
        <img src="/svg/Plus.svg" alt="Plus icon" />
        NEW
      </button>
      <div className={classes.navMenu}>
        <Link href="/settings" className={classes.item}>
          <img src="/svg/Settings.svg" alt="Settings icon" />
          <p>Settings</p>
        </Link>
        <Link href="/" className={classes.item}>
          <img src="/svg/LogOut.svg" alt="Log out icon" />
          <p>Log out</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
