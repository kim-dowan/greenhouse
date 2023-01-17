import { firebaseInstance } from "fbase";
import { useParams } from "react-router-dom";

const Request = () => {
  const { tem } = useParams();
  const date = new Date();
  const date_str = `${date.getMonth()}월${date.getDate()}일`;
  const time_str = `${date.getHours()}시${date.getMinutes()}분`;
  const dataBaseRef = firebaseInstance.database().ref();
  dataBaseRef
    .once("value")
    .then((snapshot) => {
      console.log(snapshot.val());
    })
    .catch((err) => {
      console.log(err);
    });

  return <div>request</div>;
};

export default Request;
