import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Meta from '../meta';

const setingss = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export default function HomeLayout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const router = useRouter();
  const { key } = router.query as { key?: string };
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Meta {...meta} />
      <div className={`${key ? 'bg-gray-50' : ''} z-20`}>
        <div className="mx-auto max-w-screen-xl px-5 md:px-20">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/_static/logotype.svg"
                  alt="adil.sh logo"
                  width={834}
                  height={236}
                  className="w-24"
                />
              </Link>
            </div>
            <div>
              <nav>
                <ul>
                  <li>item one</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {children}
      <div className="z-10 flex h-20 items-center justify-center space-x-12 border-t border-gray-200">
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <span className="sr-only">Twitter</span>
        </a>
        <Link href="/">
          <span className="sr-only">Logo</span>
        </Link>
        <a
          href="https://github.com/steven-tey/dub"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only">Github</span>
        </a>
      </div>
    </div>
  );
}
