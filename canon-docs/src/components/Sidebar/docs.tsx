'use client';

import Link from 'next/link';
import { components, overview, layoutComponents, theme } from '@/utils/data';
import { Box } from '../../../../packages/canon/src/components/Box';
import { Text } from '../../../../packages/canon/src/components/Text';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.css';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const data = [
  {
    title: 'Overview',
    content: overview,
    url: '',
  },
  {
    title: 'Theme',
    content: theme,
    url: '/theme',
  },
  {
    title: 'Layout Components',
    content: layoutComponents,
    url: '/components',
  },
  {
    title: 'Components',
    content: components,
    url: '/components',
  },
];

export const Docs = () => {
  const pathname = usePathname();
  const isPlayground = pathname.includes('/playground');

  return (
    <motion.div
      className={styles.section}
      animate={{
        x: isPlayground ? -10 : 0,
        opacity: isPlayground ? 0 : 1,
        visibility: isPlayground ? 'hidden' : 'visible',
      }}
      initial={{
        x: isPlayground ? -10 : 0,
        opacity: isPlayground ? 0 : 1,
        visibility: isPlayground ? 'hidden' : 'visible',
      }}
      transition={{ duration: 0.2 }}
    >
      {data.map(section => {
        return (
          <Fragment key={section.title}>
            <Box marginTop="lg" marginBottom="2xs">
              <Text variant="body" weight="bold">
                {section.title}
              </Text>
            </Box>
            {section.content.map(item => {
              const isActive = pathname === `${section.url}/${item.slug}`;

              return (
                <Link
                  href={`${section.url}/${item.slug}`}
                  key={item.slug}
                  className={`${styles.line} ${isActive ? styles.active : ''}`}
                >
                  <Text variant="body">{item.title}</Text>
                  <Text
                    variant="body"
                    style={{ color: 'var(--canon-text-secondary)' }}
                  >
                    {item.status === 'alpha' && 'Alpha'}
                    {item.status === 'beta' && 'Beta'}
                    {item.status === 'inProgress' && 'In Progress'}
                    {item.status === 'stable' && 'Stable'}
                    {item.status === 'deprecated' && 'Deprecated'}
                  </Text>
                </Link>
              );
            })}
          </Fragment>
        );
      })}
    </motion.div>
  );
};
