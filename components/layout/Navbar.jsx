import Image from "next/image";
import LinkButton from "./LinkButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "@store/actions/authActions";
import styles from "@styles/layout/navbar.module.css";

const Navbar = () => {
  // Get the user from state
  const user = useSelector((state) => state.auth.user);

  // Dispatch and router
  const dispatch = useDispatch();
  const router = useRouter();

  // Logout the user
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className={styles.Navbar}>
      <div>
        <Link href='/'>
          <a>
            <Image src='/images/layout/logo.svg' width={64} height={64} />
          </a>
        </Link>
      </div>

      <div className={styles.Items}>
        <ul>
          <li>
            <Link href='/build-burger'>
              <a>Build</a>
            </Link>
          </li>
          <li>
            <Link href='/account'>
              <a>Account</a>
            </Link>
          </li>
        </ul>

        {user ? (
          <Button text='Log Out' clicked={handleLogout} />
        ) : (
          <LinkButton href='/register' text='Sign Up' />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
