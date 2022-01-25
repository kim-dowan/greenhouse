import { useEffect, useState } from "react/cjs/react.development";

const Home = ({ userObj }) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    console.log(userObj);
    if (userObj.displayName) {
      setInit(true);
    } else {
      window.location.reload();
    }
  }, []);
  return (
    <div>
      {init ? (
        <div>안녕하세요 {userObj.displayName}님!</div>
      ) : (
        <div>잠시만 기다려주세요...!</div>
      )}
    </div>
  );
};

export default Home;
