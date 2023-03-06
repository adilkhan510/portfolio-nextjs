import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { TerminalIcon } from '@heroicons/react/solid';
import { FolderIcon } from '@heroicons/react/solid';
import { FolderOpenIcon } from '@heroicons/react/solid';

interface PersonInfoTerminalProps {
  name: string;
  age: number;
  occupation: string;
}

const createOutput = (pwd: string): JSX.Element => {
  return (
    <div className="flex flex-wrap items-center">
      <FolderIcon className="h-4 w-4 text-green-500 mr-2" />
      <p className="text-white">{pwd}</p>
    </div>
  );
};

const PersonInfoTerminal: FC<PersonInfoTerminalProps> = ({
  name,
  age,
  occupation,
}) => {
  const [currentDirectory, setCurrentDirectory] =
    useState<string>('~/users/adil');
  const [command, setCommand] = useState<string>('');
  const [output, setOutput] = useState<JSX.Element[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);

  const handleCommandChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleCommandSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOutput((prevOutput) => [
      ...prevOutput,
      <div key={prevOutput.length} className="text-green-500 font-pixelated">
        {currentDirectory} ${command}
      </div>,
    ]);

    switch (command) {
      case 'cd about':
        setCurrentDirectory('~/users/adil/about');
        setOutput((prevOutput) => [...prevOutput, createOutput('bio.txt')]);
        break;
      case 'ls':
        if (currentDirectory === '~/users/adil') {
          setOutput((prevOutput) => [...prevOutput, createOutput('about')]);
        } else if (currentDirectory === '~/users/adil/about') {
          setOutput((prevOutput) => [...prevOutput, createOutput('bio.txt')]);
        } else {
          setOutput((prevOutput) => [
            ...prevOutput,
            <div key={prevOutput.length} className="text-red-500">
              {`ls: cannot access '${currentDirectory}': No such file or directory`}
            </div>,
          ]);
        }
        break;
      case 'cat bio.txt':
        setOutput((prevOutput) => [
          ...prevOutput,
          <div key={prevOutput.length} className="text-white">
            Hi, my name is {name}, and I am a {occupation} who works with React,
            Next.js, and TypeScript. I have over {age} years of experience in
            web development.
          </div>,
        ]);
        break;
      case 'cd ..':
        setCurrentDirectory('~/users/adil');
        setOutput([]);
        break;
      default:
        setOutput((prevOutput) => [
          ...prevOutput,
          <div key={prevOutput.length} className="text-red-500">
            {`bash: ${command}: command not found`}
          </div>,
        ]);
        break;
    }

    setCommandHistory((prevHistory) => [...prevHistory, command]);
    setCommand('');
    setCommandIndex(-1);
  };

  const handleCommandKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        if (commandIndex < commandHistory.length - 1) {
          setCommandIndex((prevIndex) => prevIndex + 1);
          setCommand(commandHistory[commandIndex + 1]);
        }
        break;
      case 'ArrowDown':
        if (commandIndex > -1) {
          setCommandIndex((prevIndex) => prevIndex - 1);
          if (commandIndex === 0) {
            setCommand('');
          } else {
            setCommand(commandHistory[commandIndex - 1]);
          }
        }
        break;
    }
  };

  return (
    <div className="bg-black rounded-lg px-4 py-2 w-full max-w-4xl">
      <div className="flex items-center justify-between">
        <p className="text-green-500">{currentDirectory}</p>
        <TerminalIcon className="h-6 w-6 text-green-500" />
      </div>
      <div className="bg-black font-pixelated px-2 py-1 mt-2 h-64 overflow-y-auto">
        {output}
      </div>
      <form onSubmit={handleCommandSubmit} className="mt-2">
        <span className="text-green-500 font-pixelated mr-2">
          {currentDirectory} $
        </span>
        <input
          className="bg-transparent focus:outline-none text-green-500 w-auto"
          type="text"
          value={command}
          onChange={handleCommandChange}
          onKeyDown={handleCommandKeyDown}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default PersonInfoTerminal;
