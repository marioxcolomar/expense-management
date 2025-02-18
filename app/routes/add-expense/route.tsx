import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import {
  Body,
  Button,
  Display,
  Input,
  RadioButtonGroup,
} from '@sumup-oss/circuit-ui';

export const meta = () => {
  return [{ title: 'Add new expense' }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const description = formData.get('description');
  const amount = formData.get('amount');
  const category = formData.get('category');
  // eslint-disable-next-line compat/compat
  await fetch(`${process.env.BACKEND_URL}/expense`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ description, amount, category }),
  });
  return redirect('/');
}

const options = [
  { description: 'Office', label: 'Office', value: 'OFFICE' },
  { description: 'Travel', label: 'Travel', value: 'TRAVEL' },
  { description: 'Meals', label: 'Meals', value: 'MEALS' },
];

export function AddExpenseRoute() {
  return (
    <Body>
      <Display as="h3">Add a new expense</Display>
      <Form method="post">
        <Input
          id="description"
          type="text"
          label="Description"
          name="description"
        />
        <Input id="amount" type="number" label="Amount" name="amount" />
        <RadioButtonGroup
          defaultValue="MEALS"
          label="Choose a category"
          name="category"
          options={options}
        />
        <Button type="submit">Submit expense</Button>
      </Form>
    </Body>
  );
}

export default AddExpenseRoute;
