import { useState } from "react";
import styles from "./App.module.css";

function App() {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const [lastSeconds, setLastSeconds] = useState(0);
	const [intervalId, setIntervalId] = useState<number | null>(null);

	const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHours(Number(e.target.value));
	};

	const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinutes(Number(e.target.value));
	};

	const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSeconds(Number(e.target.value));
	};

	const startTimer = () => {
		const totalSeconds = hours * 3600 + minutes * 60 + seconds;
		setLastSeconds(totalSeconds);

		const intervalId = setInterval(() => {
			setLastSeconds((prev) => {
				if (prev === 0) {
					clearInterval(intervalId);
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		setIntervalId(intervalId);
	};

	const stopTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	};

	const resumeTimer = () => {
		const intervalId = setInterval(() => {
			setLastSeconds((prev) => {
				if (prev === 0) {
					clearInterval(intervalId);
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		setIntervalId(intervalId);
	};

	const resetTimer = () => {
		setLastSeconds(0);

		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	};

	const canStart = hours > 0 || minutes > 0 || seconds > 0;
	const counting = lastSeconds > 0;
	const paused = intervalId === null && lastSeconds > 0;

	const screenHours = Math.floor(lastSeconds / 3600);
	const screenMinutes = Math.floor((lastSeconds % 3600) / 60);
	const screenSeconds = lastSeconds % 60;

	return (
		<div className={styles.timer}>
			<h1>Timer</h1>
			{counting ? (
				<p>
					{screenHours}:{screenMinutes}:{screenSeconds}
				</p>
			) : (
				<div>
					<input type="number" value={hours} onChange={handleHoursChange} />
					<span>:</span>
					<input type="number" value={minutes} onChange={handleMinutesChange} />
					<span>:</span>
					<input type="number" value={seconds} onChange={handleSecondsChange} />
				</div>
			)}

			<div className={styles.buttonContainer}>
				<button
					type="button"
					disabled={!canStart || counting}
					onClick={startTimer}
				>
					Start
				</button>
				{paused ? (
					<button type="button" onClick={resumeTimer}>
						Resume
					</button>
				) : (
					<button type="button" onClick={stopTimer}>
						Pause
					</button>
				)}

				<button type="button" onClick={resetTimer}>
					Reset
				</button>
			</div>
		</div>
	);
}

export default App;
