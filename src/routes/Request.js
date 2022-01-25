import { dbService } from "fbase";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Request = () => {
  const { tem, hum } = useParams();
  const now_time = new Date();
  const year = String(now_time.getFullYear());
  const month = String(now_time.getMonth() + 1);
  const date = String(now_time.getDate());
  const hour = String(now_time.getHours());
  const min = String(now_time.getMinutes());
  const time = year + "_" + month + "_" + date + "-" + hour + ":" + min;
  console.log(time + "/" + tem + "/" + hum);
  return (
    <div>
      request {tem} {hum}
    </div>
  );
};

export default Request;
