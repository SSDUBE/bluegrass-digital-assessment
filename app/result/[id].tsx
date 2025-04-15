import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ResultsDetailsScreen from '../screens/ResultsDetails/ResultsDetailsScreen';

export default function ResultDetailsScreen() {
  const { id } = useLocalSearchParams();
  const requestId = id as string;
  
  return <ResultsDetailsScreen requestId={requestId} />;
}
