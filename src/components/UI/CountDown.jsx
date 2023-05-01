import React, { useEffect, useState } from "react";
import updateTimer from "../utilities/Timer";
import Skeleton from "./Skeleton";

let startTime = Date.now();

export const CountDown = ({ expiryTime }) => {
  const [timer, setTimer] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });
  const [expire, setExpire] = useState(false);

  useEffect(() => {
    let cancelId = setInterval(() => {
      let { seconds, minutes, hours, expired } = updateTimer(
        startTime,
        expiryTime
      );
      if (!expired) {
        setTimer({ seconds, minutes, hours });
      }
      setExpire(expired);
    }, 1000);
    return () => {
      clearInterval(cancelId);
    };
  }, [expiryTime]);

  return !expire ? (
    timer.hours !== null ? (
      <span>{`${timer.hours}h ${timer.minutes}m ${timer.seconds}s`}</span>
    ) : (
      <span><Skeleton width={'70px'}/></span>
    )
  ) : (
    <span>Expired</span>
  );
};
