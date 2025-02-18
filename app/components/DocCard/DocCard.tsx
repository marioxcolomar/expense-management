import { useId } from 'react';
import { Body, Card, Headline } from '@sumup-oss/circuit-ui';

import styles from './DocCard.module.css';

export interface DocCardProps {
  title: string;
  description: string;
  href: string;
  target: string;
}

export function DocCard({ title, description, href, target }: DocCardProps) {
  const descriptionId = useId();
  return (
    <Card>
      <Headline as="h2" className={styles.title}>
        <a
          href={href}
          target={target || '_blank'}
          aria-describedby={descriptionId}
          rel="noreferrer"
        >
          {title}
        </a>
      </Headline>
      <Body id={descriptionId}>{description}</Body>
    </Card>
  );
}
