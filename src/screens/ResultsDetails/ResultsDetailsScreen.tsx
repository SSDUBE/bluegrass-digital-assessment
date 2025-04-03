import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MainStackParamList, SpecimenResult } from '../../types';
import { theme } from '../../theme';
import { useResults } from '../../hooks/useResults';
import Button from '../../components/Button';

type ResultsDetailsRouteProp = RouteProp<MainStackParamList, 'ResultsDetails'>;

/**
 * ResultsDetailsScreen - Shows detailed information about a specific test result
 */
const ResultsDetailsScreen: React.FC = () => {
  const route = useRoute<ResultsDetailsRouteProp>();
  const navigation = useNavigation();
  const { requestId } = route.params;
  const { selectedResult, loading, error, loadResultById } = useResults();

  const [loadedRequestId, setLoadedRequestId] = React.useState<string | null>(null);

  useEffect(() => {
    if (requestId !== loadedRequestId) {
      console.log(`Loading result ID: ${requestId} (previous: ${loadedRequestId})`);

      loadResultById(requestId)
        .then(() => {
          console.log('Result loaded successfully');
          setLoadedRequestId(requestId);
        })
        .catch(err => {
          console.log('Error loading result:', err);
        });
    }
  }, [requestId, loadResultById, loadedRequestId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <LoadingIndicator
          size="large"
          text="Loading details..."
          fullscreen
          style={styles.loadingContainer}
        />
      </View>
    );
  }

  if (error && !selectedResult) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Requisition: {requestId}</Text>
        </View>
        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-circle" size={50} color={theme.colors.error} />
          <Text style={styles.errorText}>Failed to load result details</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!selectedResult) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Requisition: {requestId}</Text>
        </View>
        <View style={styles.errorContainer}>
          <FontAwesome name="search" size={50} color="#666" />
          <Text style={styles.errorText}>Result not found</Text>
          <Text style={styles.errorSubtext}>The requested test result could not be found.</Text>
        </View>
      </View>
    );
  }

  const renderTestResults = (results: SpecimenResult[] | undefined) => {
    if (!results || results.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No test results available</Text>
        </View>
      );
    }

    return results.map((result, index) => {
      const isAbnormal = result.status !== 'Normal';
      
      let valueColor = theme.colors.testValueDefault;
      
      if (result.value === '4.0 mmol/l' || result.value === '1.0 mmol/l') {
        valueColor = theme.colors.testValueNormal;
      } else if (result.value === '25 g/dl') {
        valueColor = theme.colors.testValueHigh;
      } else if (isAbnormal) {
        valueColor = theme.colors.error;
      }

      return (
        <View key={index} style={styles.testResultItem}>
          <Text style={styles.testName}>{result.test}</Text>
          <View style={styles.valueAndButtonContainer}>
            <View style={styles.valueContainer}>
              <Text style={[styles.testValue, { color: valueColor }]}>
                {result.value}
              </Text>
              <Text style={styles.referenceRange}>Ref: {result.range}</Text>
            </View>
            <Button
              title="View"
              variant="outline"
              size="small"
              onPress={() => {}}
              style={styles.viewButtonContainer}
              textStyle={styles.viewButtonText}
            />
          </View>
        </View>
      );
    });
  };

  const textLabel = (label: string, info: string) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{info}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Requisition: {requestId}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {selectedResult.specimens.map((specimen, specimenIndex) => (
          <View key={specimenIndex} style={styles.specimenContainer}>
            <View style={styles.infoGrid}>
              <View style={styles.infoRowHorizontal}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>{selectedResult.date}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoValue}>{selectedResult.time}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Doctor</Text>
                  <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{selectedResult.doctorName}</Text>
                </View>
              </View>
            </View>

            <View style={styles.specimenHeader}>
              <Text style={styles.specimenLabel}>
                Specimen - <Text style={styles.collectionId}>{specimen.collectionId}</Text>
              </Text>
            </View>

            {renderTestResults(specimen.results)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,
    height: 140,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontFamily: theme.typography.fontFamily.bold,
    textAlign: 'right',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  specimenContainer: {
    backgroundColor: 'white',
    margin: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
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
  infoGrid: {
    padding: theme.spacing.m,
    backgroundColor: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs / 2,
  },
  infoRowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    paddingHorizontal: theme.spacing.xs,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: theme.typography.fontFamily.medium,
  },
  specimenHeader: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing.m,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  specimenLabel: {
    fontSize: 14,
    color: '#333',
    fontFamily: theme.typography.fontFamily.medium,
  },
  collectionId: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  testResultItem: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  valueAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  valueContainer: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    color: '#333',
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: 4,
  },
  testValue: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: 4,
  },
  abnormalValue: {
    color: '#e53935',
  },
  referenceRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontFamily: theme.typography.fontFamily.regular,
  },
  viewButtonContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.xs,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.medium,
    textAlign: 'center',
  },
  noResultsContainer: {
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.m,
    fontSize: 16,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    marginTop: theme.spacing.m,
    fontSize: 18,
    color: theme.colors.error,
    fontFamily: theme.typography.fontFamily.medium,
  },
  errorSubtext: {
    marginTop: theme.spacing.s,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.regular,
  },
});

export default ResultsDetailsScreen;
