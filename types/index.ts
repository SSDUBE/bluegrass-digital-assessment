// Component types
export interface InfoItem {
  label: string;
  value: string;
  isLink?: boolean;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
}

export interface SpecimenResult {
  test: string;
  value: string;
  range: string;
  status: 'Normal' | 'High' | 'Low' | 'Abnormal';
}

export interface Specimen {
  type: string;
  collectionId: string;
  collectionDate?: string;
  status: string;
  results?: SpecimenResult[];
}

export interface ResultItem {
  id: string;
  patientName: string;
  patientId?: string;
  doctorName: string;
  date: string;
  time: string;
  status?: string;
  specimens: Specimen[];
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    // Test result colors
    testValueNormal: string;
    testValueHigh: string;
    testValueDefault: string;
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  borderRadius: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  typography: {
    fontSizes: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
    };
    fontWeights: {
      regular: '400' | 400;
      medium: '500' | 500;
      bold: '600' | 600 | 'bold';
    };
    fontFamily: {
      regular: string;
      medium: string;
      bold: string;
    };
  };
}
