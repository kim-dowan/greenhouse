import { firebaseInstance } from "fbase";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-8} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(0)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default class TempChart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/line-chart-with-customized-label-hs5b7";

  render() {
    const displayAmount = 10;
    let dataArr = [];

    async function readData(cnt) {
      for (let i = cnt - displayAmount + 1; i <= cnt; i++) {
        const dataRef = firebaseInstance.database().ref(String(i));
        dataRef
          .get()
          .then((snap) => {
            let dataSet = {};
            const temp = snap.val()["temp"];
            const time = String(snap.val()["time"]).split(" ")[1];
            dataSet["온도"] = parseFloat(
              `${temp.slice(0, temp.length - 2)}.${temp.slice(-2)}`
            );
            dataSet["time"] = time.split(":")[0] + ":" + time.split(":")[1];
            dataArr.push(dataSet);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    const dataBaseRef = firebaseInstance.database().ref("count");
    dataBaseRef.on("value", (snapshot) => {
      const count = parseInt(snapshot.val());
      console.log(`Count : ${count}`);
      readData(count);
      console.log(dataArr);
      setTimeout(() => {
        document.getElementById("chart").style.width = "99%";
      }, 1000);
    });
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width="100%"
          height="100%"
          data={dataArr}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="온도"
            stroke="#FF1212"
            label={<CustomizedLabel />}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
