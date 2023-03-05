import { useState, useEffect } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function HackerScreen() {
  const [hovered, setHovered] = useState(false);
  const [title, setTitle] = useState('ADIL KHAN');
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (intervalId) return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleTitleHover = () => {
    let iteration = 0;

    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      setTitle((prevTitle) =>
        prevTitle
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return title.charAt(index);
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join('')
      );

      if (iteration >= title.length) {
        clearInterval(id);
      }

      iteration += 1 / 3;
    }, 30);

    setIntervalId(id as any);
  };

  return (
    <div className="h-screen">
      <h1
        className={`${
          hovered ? ' text-blue-300' : 'text-blue-500'
        } font-mono text-3xl sm:text-7xl lg:text-10xl rounded-md px-0 sm:px-1 md:px-2 lg:px-3 cursor-pointer transition-colors duration-600 text-sans`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseOver={handleTitleHover}
        data-value={title}
      >
        {title}
      </h1>
    </div>
  );
}
