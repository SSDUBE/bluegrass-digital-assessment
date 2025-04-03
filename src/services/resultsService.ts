import { ResultItem } from '../types';

const SPINNER_TIMEOUT = 1500;

// Reusable mock data
const mockResults: ResultItem[] = [
  {
    id: '156124798',
    patientName: 'Mr Louis Eksteen',
    patientId: 'PAT12345',
    doctorName: 'Dr Chris Barnard',
    date: '24 Jun 2022',
    time: '10:59',
    status: 'Completed',
    specimens: [
      {
        type: 'Haemoglobin, Lipogram',
        collectionId: '22:JH20315',
        collectionDate: '24 Jun 2022',
        status: 'Completed',
        results: [
          {
            test: 'Haemoglobin',
            value: '25 g/dl',
            range: '14.3 - 18.3 g/dl',
            status: 'High',
          },
          {
            test: 'Cholesterol Total',
            value: '4.0 mmol/l',
            range: '2.8 - 4.9 mmol/l',
            status: 'Normal' as const,
          },
          {
            test: 'Triglycerides',
            value: '1.0 mmol/l',
            range: '0.5 - 1.6 mmol/l',
            status: 'Normal' as const,
          },
        ],
      },
    ],
  },
  {
    id: '123546783',
    patientName: 'Mrs Sarah Smith',
    patientId: 'PAT12346',
    doctorName: 'Dr Chris Barnard',
    date: '13 May 2022',
    time: '16:12',
    status: 'Pending',
    specimens: [
      {
        type: 'SARS-CoV-2 Antigen',
        collectionId: '22:PH25103',
        collectionDate: '13 May 2022',
        status: 'Processing',
        results: [
          {
            test: 'SARS-CoV-2 Antigen',
            value: 'Negative',
            range: 'Negative',
            status: 'Normal' as const,
          },
        ],
      },
    ],
  },
  {
    id: '114357830',
    patientName: 'Mr James Brown',
    patientId: 'PAT12347',
    doctorName: 'Dr Candice North',
    date: '03 Jan 2022',
    time: '14:32',
    status: 'Completed',
    specimens: [
      {
        type: 'Histo Block, Histo Add Block/3',
        collectionId: '0721:AS08073R',
        collectionDate: '03 Jan 2022',
        status: 'Completed',
        results: [
          {
            test: 'Histo Block',
            value: 'Normal',
            range: 'Normal',
            status: 'Normal' as const,
          },
        ],
      },
      {
        type: 'C-Reactive Protein, Full Blood Count, Urea...',
        collectionId: '22:DC54231',
        collectionDate: '03 Jan 2022',
        status: 'Completed',
        results: [
          {
            test: 'C-Reactive Protein',
            value: '3.2 mg/L',
            range: '0.0 - 5.0 mg/L',
            status: 'Normal' as const,
          },
          {
            test: 'Full Blood Count',
            value: 'Normal',
            range: 'Normal',
            status: 'Normal' as const,
          },
        ],
      },
    ],
  },
];

/**
 * Service for fetching test results
 */
export const resultsService = {
  getResults: async (): Promise<ResultItem[]> => {
    await new Promise<void>(resolve => {
      const timer = setTimeout(resolve, Math.min(1500, SPINNER_TIMEOUT));
      return () => clearTimeout(timer);
    });

    return mockResults;
  },

  /**
   * Get a specific result by ID
   */
  getResultById: async (id: string): Promise<ResultItem | null> => {
    await new Promise<void>(resolve => {
      const timer = setTimeout(resolve, Math.min(1500, SPINNER_TIMEOUT));
      return () => clearTimeout(timer);
    });

    console.log('Finding result with ID:', id);
    const result = mockResults.find(item => item.id === id) || null;
    console.log('Result found:', result ? 'Yes' : 'No');
    return result;
  },

  /**
   * Get user profile information
   */
  getUserProfile: async (): Promise<{ name: string; patientId: string }> => {
    await new Promise<void>(resolve => {
      const timer = setTimeout(resolve, Math.min(1500, SPINNER_TIMEOUT));
      return () => clearTimeout(timer);
    });

    if (mockResults.length > 0) {
      const firstResult = mockResults[0];
      return {
        name: firstResult.patientName,
        patientId: firstResult.patientId || '',
      };
    }

    return {
      name: 'Default User',
      patientId: 'PAT00000',
    };
  },
};
