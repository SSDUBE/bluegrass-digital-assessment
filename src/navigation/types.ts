import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  ResultsListing: undefined;
  ResultsDetails: {
    requestId: string;
  };
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;
};

export {};
