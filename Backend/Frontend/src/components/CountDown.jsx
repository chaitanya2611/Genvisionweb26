import { useState, useEffect } from "react";
import "../css/countdown.css"; // custom CSS file

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.expired) {
    return <div className="text-danger text-center display-5 mt-4">Event Started!</div>;
  }

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
      {timeBlocks.map((block, idx) => (
        <div key={idx} className="countdown-card text-center p-3">
          <div className="countdown-value">{block.value}</div>
          <div className="countdown-label">{block.label}</div>
        </div>
      ))}
    </div>
  );
}
