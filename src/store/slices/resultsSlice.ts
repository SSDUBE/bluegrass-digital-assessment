import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ResultItem } from '../../types';
import { resultsService } from '../../services/resultsService';
import { RootState } from '../index';

interface ResultsState {
  results: ResultItem[];
  selectedResult: ResultItem | null;
  userProfile: {
    name: string;
    patientId: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResultsState = {
  results: [],
  selectedResult: null,
  userProfile: null,
  loading: false,
  error: null,
};

export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async (_, { rejectWithValue }) => {
    try {
      return await resultsService.getResults();
    } catch (error) {
      return rejectWithValue(`Failed to fetch results: ${error}`);
    }
  },
);

export const fetchResultById = createAsyncThunk(
  'results/fetchResultById',
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await resultsService.getResultById(id);
      if (!result) {
        return rejectWithValue('Result not found');
      }
      return result;
    } catch (error) {
      return rejectWithValue(`Failed to fetch results: ${error}`);
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  'results/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await resultsService.getUserProfile();
    } catch (error) {
      return rejectWithValue(`Failed to fetch results: ${error}`);
    }
  },
);

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    clearSelectedResult: state => {
      state.selectedResult = null;
    },
  },
  extraReducers: builder => {
    // Fetch all results
    builder
      .addCase(fetchResults.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action: PayloadAction<ResultItem[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch result by ID
      .addCase(fetchResultById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultById.fulfilled, (state, action: PayloadAction<ResultItem>) => {
        state.loading = false;
        state.selectedResult = action.payload;
      })
      .addCase(fetchResultById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch user profile
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload as { name: string; patientId: string };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedResult } = resultsSlice.actions;

export const selectAllResults = (state: RootState) => state.results.results;
export const selectSelectedResult = (state: RootState) => state.results.selectedResult;
export const selectUserProfile = (state: RootState) => state.results.userProfile;
export const selectResultsLoading = (state: RootState) => state.results.loading;
export const selectResultsError = (state: RootState) => state.results.error;

export default resultsSlice.reducer;
