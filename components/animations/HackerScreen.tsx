import classNames from 'classnames';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const letters = '1010101010';
export interface HackerScreenProps {
  className?: string;
  title?: string;
  text?: string;
  href?: string;
}
export default function HackerScreen(props: HackerScreenProps) {
  const [hovered, setHovered] = useState(false);
  const [title, setTitle] = useState(props.title || 'adil.sh');
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

            return letters[Math.floor(Math.random() * 10)];
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
    <div className="">
      <h1
        className={classNames(
          props.className,
          `${
            hovered ? ' text-blue-300' : 'text-blue-500'
          } font-serifs font-extralight text-3xl md:text-6xl lg:text-10xl rounded-md px-0 sm:px-1 md:px-2 lg:px-3 cursor-pointer transition-colors duration-600 text-sans`
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseOver={handleTitleHover}
        data-value={title}
      >
        <Link
          href={
            props.href
              ? props.href
              : 'https://www.linkedin.com/in/adilmuneerkhan/'
          }
          passHref
        >
          {title}
        </Link>
      </h1>
    </div>
  );
}
