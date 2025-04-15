import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the results listing screen
  return <Redirect href="/results" />;
}
