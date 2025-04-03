import { ResultItem } from '../types';

const SPINNER_TIMEOUT = 1500;

// Reusable mock data
// Base mock results that will be used to generate more records
const baseMockResults: ResultItem[] = [
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

// Function to generate a random date within the last year
const generateRandomDate = () => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  const randomTimestamp = oneYearAgo.getTime() + Math.random() * (today.getTime() - oneYearAgo.getTime());
  const randomDate = new Date(randomTimestamp);
  
  // Format date as DD MMM YYYY
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = randomDate.getDate().toString().padStart(2, '0');
  const month = months[randomDate.getMonth()];
  const year = randomDate.getFullYear();
  
  // Format time as HH:MM
  const hours = randomDate.getHours().toString().padStart(2, '0');
  const minutes = randomDate.getMinutes().toString().padStart(2, '0');
  
  return {
    date: `${day} ${month} ${year}`,
    time: `${hours}:${minutes}`
  };
};

// Function to generate a random status
const generateRandomStatus = () => {
  const statuses = ['Completed', 'Pending', 'Processing', 'Rejected'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Function to generate a random doctor name
const generateRandomDoctor = () => {
  const doctors = [
    'Dr Chris Barnard',
    'Dr Candice North',
    'Dr James Wilson',
    'Dr Lisa Johnson',
    'Dr Michael Chen',
    'Dr Sarah Adams',
    'Dr Robert Taylor'
  ];
  return doctors[Math.floor(Math.random() * doctors.length)];
};

// Generate 30 mock results based on the base templates
const generateMockResults = (count: number): ResultItem[] => {
  const results: ResultItem[] = [...baseMockResults];
  
  // We already have 3 base results, so we need to generate count-3 more
  for (let i = 0; i < count - 3; i++) {
    // Pick a random template from the base results
    const template = baseMockResults[i % baseMockResults.length];
    
    // Generate a random 9-digit ID
    const randomId = Math.floor(100000000 + Math.random() * 900000000).toString();
    
    // Generate random date and time
    const { date, time } = generateRandomDate();
    
    // Create a new result based on the template with some randomized values
    const newResult: ResultItem = {
      ...JSON.parse(JSON.stringify(template)), // Deep clone to avoid reference issues
      id: randomId,
      date,
      time,
      status: generateRandomStatus(),
      doctorName: generateRandomDoctor()
    };
    
    // Update collection dates in specimens
    newResult.specimens.forEach(specimen => {
      specimen.collectionDate = date;
      // Generate a random collection ID
      const year = date.split(' ')[2].substring(2);
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) + 
                           letters.charAt(Math.floor(Math.random() * letters.length));
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      specimen.collectionId = `${year}:${randomLetters}${randomNumber}`;
    });
    
    results.push(newResult);
  }
  
  return results;
};

// Generate 30 mock results
const mockResults: ResultItem[] = generateMockResults(30);

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
