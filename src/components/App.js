import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import Loading from "routes/Loading";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          // displayName: user.displayName,
          email: user.email,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
