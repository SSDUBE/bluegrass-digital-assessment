import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchResults,
  fetchResultById,
  fetchUserProfile,
  selectAllResults,
  selectSelectedResult,
  selectUserProfile,
  selectResultsLoading,
  selectResultsError,
} from '../store/slices/resultsSlice';
import { AppDispatch } from '../store';

export const useResults = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const results = useSelector(selectAllResults);
  const selectedResult = useSelector(selectSelectedResult);
  const userProfile = useSelector(selectUserProfile);
  const loading = useSelector(selectResultsLoading);
  const error = useSelector(selectResultsError);

  // Track if initial data has been loaded
  const [initialDataLoaded, setInitialDataLoaded] = React.useState(false);

  // Only load initial data once when the component mounts
  useEffect(() => {
    if (!initialDataLoaded) {
      console.log('Initial data load');
      // Load results if needed
      if (results.length === 0) {
        dispatch(fetchResults());
      }

      // Load user profile if needed
      if (!userProfile) {
        dispatch(fetchUserProfile());
      }

      setInitialDataLoaded(true);
    }
  }, [dispatch, results.length, userProfile, initialDataLoaded]);

  // Actions with loading state management
  const loadResults = () => {
    console.log('Loading results...');
    return dispatch(fetchResults());
  };

  const loadResultById = (id: string) => {
    console.log('Loading result by ID:', id);
    return dispatch(fetchResultById(id));
  };

  const loadUserProfile = () => {
    console.log('Loading user profile...');
    return dispatch(fetchUserProfile());
  };

  return {
    // State
    results,
    selectedResult,
    userProfile,
    loading,
    error,

    // Actions
    loadResults,
    loadResultById,
    loadUserProfile,
  };
};
