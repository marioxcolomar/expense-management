import type { MetaFunction } from '@remix-run/node';
import { Body, Display, ListItem } from '@sumup-oss/circuit-ui';
import { useLoaderData } from '@remix-run/react';

import { DocCard } from '../../components/DocCard/index.js';

import styles from './route.module.css';

type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
};

type ExpensesResult = {
  data: Expense[];
};

export const loader = async () => {
  // eslint-disable-next-line compat/compat
  const expenses = await fetch(`${process.env.BACKEND_URL}/expenses`, {
    method: 'GET',
  });
  return expenses;
};

const title = 'Welcome to Expense Management';

export const meta: MetaFunction = () => [
  { title },
  {
    name: 'description',
    content: 'A Remix stack using Circuit UI and Foundry',
  },
];

export default function Index() {
  const apiResult: ExpensesResult = useLoaderData();
  const data = apiResult?.data || [];

  return (
    <>
      <Display as="h1" size="m">
        {title}
      </Display>

      <Body size="l" className={styles.intro}>
        {data && data.length > 0
          ? data.map((exp) => (
              <ListItem
                key={exp.id}
                title={exp.category}
                label={exp.description}
                trailingLabel={exp.amount}
                details={exp.category}
              />
            ))
          : null}
      </Body>
      <div className={styles.cards}>
        <DocCard
          title="Add expense"
          description=""
          target="_self"
          href="add-expense"
        />
      </div>
    </>
  );
}
