import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Specimen, SpecimenResult } from '../types';
import { theme } from '../theme';

interface SpecimenCardProps {
  specimen: Specimen;
  showResults?: boolean;
  onPress?: () => void;
  style?: object;
}

/**
 * SpecimenCard - A reusable component to display specimen information
 *
 * @param specimen - The specimen data to display
 * @param showResults - Whether to show detailed test results
 * @param onPress - Optional callback for when the card is pressed
 * @param style - Optional custom styles to apply to the card
 */
const SpecimenCard: React.FC<SpecimenCardProps> = ({
  specimen,
  showResults = false,
  onPress: _onPress,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{specimen.type}</Text>
        <Text style={styles.id}>ID: {specimen.collectionId}</Text>
        {specimen.collectionDate && (
          <Text style={styles.date}>Collected: {specimen.collectionDate}</Text>
        )}
      </View>

      {showResults && specimen.results && (
        <View style={styles.resultsTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Test</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Result</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Reference Range</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Status</Text>
          </View>

          {specimen.results.map((result, index) => (
            <ResultRow key={index} result={result} index={index} />
          ))}
        </View>
      )}
    </View>
  );
};

interface ResultRowProps {
  result: SpecimenResult;
  index: number;
}

/**
 * ResultRow - A component to display a single test result row
 *
 * @param result - The test result data
 * @param index - The row index (used for alternating row colors)
 */
const ResultRow: React.FC<ResultRowProps> = ({ result, index }) => {
  const isNormal = result.status === 'Normal';
  const statusIcon = isNormal ? 'check-circle' : 'exclamation-circle';
  const statusColor = isNormal ? theme.colors.success : theme.colors.error;

  return (
    <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
      <Text style={[styles.tableCell, { flex: 2 }]}>{result.test}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{result.value}</Text>
      <Text style={[styles.tableCell, { flex: 2 }]}>{result.range}</Text>
      <View style={[styles.statusContainer, { flex: 1 }]}>
        <FontAwesome
          name={statusIcon}
          size={theme.typography.fontSizes.xs}
          color={statusColor}
          style={styles.statusIcon}
        />
        <Text style={[styles.statusText, isNormal ? styles.statusNormal : styles.statusAbnormal]}>
          {result.status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSizes.m,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  id: {
    fontSize: theme.typography.fontSizes.xs,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: theme.typography.fontSizes.xs,
    color: '#666',
  },
  resultsTable: {
    paddingBottom: theme.spacing.xs,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f7fa',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderCell: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.bold,
    color: '#4b5563',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tableRowEven: {
    backgroundColor: theme.colors.card,
  },
  tableRowOdd: {
    backgroundColor: '#fafafa',
  },
  tableCell: {
    fontSize: theme.typography.fontSizes.s - 1,
    color: theme.colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: theme.typography.fontSizes.s - 1,
  },
  statusNormal: {
    color: theme.colors.success,
    fontWeight: theme.typography.fontWeights.medium,
  },
  statusAbnormal: {
    color: theme.colors.error,
    fontWeight: theme.typography.fontWeights.medium,
  },
});

export default SpecimenCard;
