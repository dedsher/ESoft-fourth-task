import { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

const CountdownTimer = () => {
  const [startTime, setStartTime] = useState(10);
  const [endTime, setEndTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimeLeftShown, setIsTimeLeftShown] = useState(false);

  const barFullWidth = startTime - endTime;
  const barWidth = (timeLeft - endTime) / barFullWidth * 100;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerStarted) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === Number(endTime)) {
            clearInterval(intervalId);
            setIsTimerStarted(false);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);

  }, [endTime, startTime, isTimerStarted]);

  // Решает проблему отображения 0 вместо placeholder, в случае если пользователь удаляет все символы из инпута
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim() === '' ? '' : (isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value));
    setter(value as React.SetStateAction<number>);

    // При вводе новых значений перестаем отображать оставшееся время
    setIsTimeLeftShown(false);
  };

  // При старте таймера сначала присваиваем "оставшемуся времени" 
  // последнее значение из поля startTime и затем отображаем оставшееся время
  const onTimerStartClick = () => {
    setTimeLeft(startTime);
    setIsTimerStarted(true);
    setIsTimeLeftShown(true);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Countdown Timer</h1>
      <fieldset className={styles.fieldset}>
        <legend>Задайте интервал счетчика</legend>
        <div className={styles.inputsWrapper}>
          <input className={styles.input} type="text" placeholder="От" value={startTime} onChange={handleInputChange(setStartTime)} />
          -
          <input className={styles.input} type="text" placeholder="До" value={endTime} onChange={handleInputChange(setEndTime)} />
        </div>
        <button className={styles.button} onClick={onTimerStartClick}>Начать отсчет</button>
      </fieldset>
      <div className={styles.timerContainer}>
          <p className={styles.timerTitle}>{isTimeLeftShown ? timeLeft : startTime}</p>
          <div className={styles.timerBar}>
            <span style={{width: `${barWidth}%`}}></span>
          </div>
        </div>
    </div>
  );
};

export default CountdownTimer;
