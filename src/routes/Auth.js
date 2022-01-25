import { authService, firebaseInstance } from "fbase";
import { useState } from "react";
import "styles/Auth.css";
import google_icon from "google_icon.png";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwRe, setPwRe] = useState("");
  const [pwCorrection, setPwCorrection] = useState("");
  const [error, setError] = useState("");
  const onGoogleClick = async (event) => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const onChange = (event) => {
    const {
      target: { id, value },
    } = event;
    if (id === "name") {
      setName(value);
    } else if (id === "id") {
      setId(value);
    } else if (id === "pw") {
      setPw(value);
    } else if (id === "pwRe") {
      if (pw !== value) setPwCorrection("불일치");
      else setPwCorrection("일치");
      setPwRe(value);
    }
  };

  const onToggleClick = () => {
    setNewAccount((prev) => {
      return !prev;
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccount) {
      if (pw !== pwRe) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }
      setError("");
      firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(id, pw)
        .then((userCredential) => {
          var user = userCredential.user;
          authService.currentUser
            .updateProfile({
              displayName: name,
            })
            .catch((e) => {
              console.log(e);
            });
          console.log(user);
        })
        .catch((error) => {
          // var errorCode = error.code;
          setError(error.message);
        });
    } else {
      firebaseInstance
        .auth()
        .signInWithEmailAndPassword(id, pw)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          // var errorCode = error.code;
          setError(error.message);
        });
    }
  };
  return (
    <div className="auth_div">
      <h1 className="title">혜성 온실</h1>
      <br />
      {newAccount ? (
        <form onSubmit={onSubmit}>
          <div id="resgister_box">
            <input
              className="input_box"
              type="text"
              id="name"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={onChange}
              required
            />
            <input
              className="input_box"
              type="email"
              id="id"
              placeholder="이메일을 입력하세요."
              value={id}
              onChange={onChange}
              required
            />
            <br />
            <input
              className="input_box"
              type="password"
              id="pw"
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={onChange}
              required
            />
            <br />
            <input
              className="input_box"
              type="password"
              id="pwRe"
              placeholder="비밀번호를 다시 입력하세요"
              value={pwRe}
              onChange={onChange}
              required
            />
            <p>{pwCorrection}</p>
            <input type="submit" className="submit_btn" value="회원가입" />
            <p className="auth_error">{error}</p>
          </div>
          <p className="toggle_p">
            계정이 있다면?{" "}
            <a
              onClick={onToggleClick}
              name="login"
              className="newAccount_toggle"
            >
              로그인
            </a>
            하기
          </p>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <div id="login_box">
            <input
              className="input_box"
              type="email"
              id="id"
              placeholder="이메일을 입력하세요."
              value={id}
              onChange={onChange}
              required
            />
            <br />
            <input
              className="input_box"
              type="password"
              id="pw"
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={onChange}
              required
            />
            <br />
            <input type="submit" className="submit_btn" value="로그인" />
            <p className="auth_error">{error}</p>
          </div>
          <p className="toggle_p">
            계정이 없다면?{" "}
            <a
              onClick={onToggleClick}
              name="register"
              className="newAccount_toggle"
            >
              회원가입
            </a>
            하기
          </p>
        </form>
      )}
      <img
        alt="google_icon"
        src={google_icon}
        onClick={onGoogleClick}
        className="google_icon"
      />
    </div>
  );
};

export default Auth;
