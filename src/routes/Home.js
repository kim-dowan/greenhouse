import { firebaseInstance } from "fbase";
import { useEffect, useState } from "react/cjs/react.development";
import Loading from "routes/Loading";
import TempChart from "./TempChart";
import "styles/Home.css";

const Home = ({ userObj }) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    console.log(userObj);
    setInit(true);
  }, []);
  return (
    <div id="home">
      {init ? (
        <>
          {/* <p>안녕하세요 {userObj.displayName}님!</p> */}
          <div id="chart">
            <TempChart />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
