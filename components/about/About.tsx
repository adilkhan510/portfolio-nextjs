import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TerminalIcon } from '@heroicons/react/solid';
import { FolderIcon } from '@heroicons/react/solid';
import { OpenAIApi } from 'openai';
import Image from 'next/image';

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

// const generateBio = async (): Promise<any> => {
//   const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
//   const prompt = `Generate bio of a full stack developer named John who works with React, Next.js, and TypeScript.`;
//   const openaiInstance = new OpenAIApi({
//     apiKey,
//     isJsonMime(mime) {
//       return mime === 'application/json';
//     },
//   });
//   const req = await openaiInstance.createImage({
//     prompt: 'make some art',
//     size: '1024x1024',
//   });
//   const res = await openaiInstance.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     frequency_penalty: 0.0,
//     presence_penalty: 0.0,
//     max_tokens: 100,
//     messages: [
//       {
//         content: prompt,
//         role: 'user',
//       },
//     ],
//   });
//   //   return response.choices[0].text.trim();
//   return <div>{req.data.created.toLocaleString()}</div>;
// };

const generateBio = async (): Promise<string> => {
  try {
    const response = await fetch('/api/about');
    const data = await response.json();
    return data.bio;
  } catch (error) {
    console.error(error);
    return 'Error generating bio';
  }
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

  useEffect(() => {
    generateBio().then((bio) => {
      setOutput((prevOutput) => [
        ...prevOutput,
        <div key={prevOutput.length} className="text-white font-pixelated">
          {bio}
        </div>,
      ]);
    });
  }, [command]);

  const handleCommandSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        const bio = await generateBio;
        setOutput((prevOutput) => [
          ...prevOutput,
          <div key={prevOutput.length} className="text-white font-pixelated">
            {bio as any}
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
          <div key={prevOutput.length} className="text-red-500 font-pixelated">
            {`bash: ${command}: command not found`}
          </div>,
        ]);
        break;
    }

    setCommandHistory((prevHistory) => [command, ...prevHistory]);
    setCommandIndex(-1);
    setCommand('');
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
        <p className="text-green-500 font-pixelated">{currentDirectory}</p>
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
          className="bg-transparent focus:outline-none text-green-500 font-pixelated"
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
