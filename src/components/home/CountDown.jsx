import React, { useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [timeText, setTimeText] = useState("");
  const [intervalId, setIntervalId] = useState();

React.useEffect(() => {
  calculateTime();  // ← you already have this
  

  const id = setInterval(() => {   // ← add this
    calculateTime();
  }, 1000);

  setIntervalId(id);   // ← add this

  return () => {       // ← add this
    clearInterval(id);
  };
}, []);

  function calculateTime() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTimeText("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    setTimeText(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(
        secondsLeft % 60
      )}s`
    );
  }

  return <div className="de_countdown">{timeText}</div>;
};

export default CountDown;
