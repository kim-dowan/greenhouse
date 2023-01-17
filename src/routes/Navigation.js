import { authService } from "fbase";
import "styles/Navigation.css";

const Navigation = () => {
  const onLogoutClick = async () => {
    await authService.signOut();
  };
  return (
    <nav className="nav_bar">
      <h1
        className="nav_title"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        혜성 온실
      </h1>
      <button className="logout_btn" onClick={onLogoutClick}>
        로그아웃
      </button>
    </nav>
  );
};

export default Navigation;
