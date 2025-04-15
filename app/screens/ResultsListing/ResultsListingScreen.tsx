import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { ResultItem } from '../../../types';
import { theme } from '../../../theme';
import { useResults } from '../../../hooks/useResults';
import { useContactModal } from '../../../hooks/useContactModal';
import ContactModal from '../../../components/ContactModal';
import { getStatusStyle } from '../../../utils/statusUtils';
import Button from '../../../components/Button';

const ResultsListingScreen: React.FC = () => {
  const router = useRouter();
  const { results, userProfile, loading, error, loadResults, loadUserProfile } = useResults();
  const { isVisible, closeModal, showModal } = useContactModal();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr Barnard');
  const [expandedSpecimens, setExpandedSpecimens] = useState<{[key: string]: boolean}>({});

  const handleRefresh = () => {
    setRefreshing(true);

    loadResults().finally(() => {
      setRefreshing(false);
    });
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleDoctorPress = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    showModal();
  };

  const navigateToDetails = (requestId: string) => {
    console.log('Navigating to details for request ID:', requestId);
    router.push({
      pathname: '/result/[id]',
      params: { id: requestId }
    });
  };

  const toggleSpecimen = (requestId: string, specimenIndex: number) => {
    const key = `${requestId}-${specimenIndex}`;
    setExpandedSpecimens(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    (async () => {
      await Promise.all([loadResults(), loadUserProfile()]);
    })();
  }, []);

  const renderResultItem = ({ item }: { item: ResultItem }) => {
    const statusStyle = getStatusStyle(item.status || 'Unknown');

    return (
      <View style={styles.resultCard}>
        <View style={styles.requestHeader}>
          <View style={styles.requestIdContainer}>
            <Text style={styles.requestLabel}>Req #: </Text>
            <TouchableOpacity
              onPress={() => navigateToDetails(item.id)}
              activeOpacity={0.7}
              disabled={loading}>
              <Text style={styles.requestIdClickable}>{item.id}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {item.status || 'Unknown'}
            </Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{item.date}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>{item.time}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Doctor</Text>
            <TouchableOpacity onPress={() => handleDoctorPress(item.doctorName)}>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{item.doctorName}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {item.specimens.map((specimen, index) => {
          const isExpanded = expandedSpecimens[`${item.id}-${index}`] || false;
          const arrowRotation = isExpanded ? '90deg' : '0deg';
          
          return (
            <View key={index} style={styles.specimenContainer}>
              <TouchableOpacity
                style={styles.specimenItem}
                onPress={() => toggleSpecimen(item.id, index)}
                activeOpacity={0.7}
                disabled={loading}>
                <Text style={styles.specimenLabel}>Specimen - {specimen.collectionId}</Text>
                <View style={styles.specimenRow}>
                  <Text style={styles.specimenType}>{specimen.type}</Text>
                  <FontAwesome 
                    name="chevron-right" 
                    size={16} 
                    color={theme.colors.primary} 
                    style={{ transform: [{ rotate: arrowRotation }] }}
                  />
                </View>
              </TouchableOpacity>
              
              {isExpanded && specimen.results && specimen.results.length > 0 && (
                <View style={styles.specimenDetails}>
                  {specimen.results.map((result, resultIndex) => {
                    let valueColor = theme.colors.testValueDefault;
                    
                    if (result.status === 'Normal') {
                      valueColor = theme.colors.testValueNormal;
                    } else if (result.status === 'High') {
                      valueColor = theme.colors.testValueHigh;
                    } else if (result.status === 'Low' || result.status === 'Abnormal') {
                      valueColor = theme.colors.error;
                    }
                    
                    return (
                      <View key={resultIndex} style={styles.testResultItem}>
                        <Text style={styles.testName}>{result.test}</Text>
                        <View style={styles.testResultRow}>
                          <View>
                            <Text style={[styles.testValue, { color: valueColor }]}>
                              {result.value}
                            </Text>
                            <Text style={styles.referenceRange}>Ref: {result.range}</Text>
                          </View>
                          <View style={[styles.statusBadge, { backgroundColor: getStatusStyle(result.status).backgroundColor }]}>
                            <Text style={[styles.statusText, { color: getStatusStyle(result.status).color }]}>
                              {result.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              
              {isExpanded && (!specimen.results || specimen.results.length === 0) && (
                <View style={styles.specimenDetails}>
                  <Text style={styles.noResultsText}>No test results available for this specimen</Text>
                </View>
              )}
              
              {isExpanded && (
                <View style={styles.viewButtonContainer}>
                  <Button 
                    title="View Full Details"
                    variant="primary"
                    size="small"
                    onPress={() => navigateToDetails(item.id)}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  if (loading && results.length === 0) {
    return (
      <View style={styles.fullScreenContainer}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <LoadingIndicator
          size="large"
          text="Loading your test results..."
          fullscreen
          style={styles.loadingContainer}
        />
      </View>
    );
  }

  if (error && results.length === 0) {
    return (
      <View style={styles.fullScreenContainer}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>Error</Text>
        </View>

        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-circle" size={50} color={theme.colors.error} />
          <Text style={styles.errorText}>Failed to load results</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.userName}>{userProfile?.name || 'Patient'}</Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Cumulative Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome name="file-o" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No test results found</Text>
            </View>
          }
        />
      </View>

      <ContactModal
        isVisible={isVisible}
        onClose={handleCloseModal}
        doctorName={selectedDoctor}
        phoneNumber="0217943674"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  welcomeHeader: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 80,
    fontFamily: theme.typography.fontFamily.regular,
  },
  userName: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.bold,
  },
  reportButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.m * 3,
  },
  reportButtonText: {
    color: '#0052cc',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily.bold,
  },
  contentWrapper: {
    flex: 1,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background,
    marginTop: -30,
    zIndex: 1,
    overflow: 'hidden',
  },
  listContent: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  resultCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  requestIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestLabel: {
    fontSize: 16,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold,
  },
  requestIdClickable: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily.medium,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.s,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.medium,
  },
  infoGrid: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: theme.spacing.m,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: theme.typography.fontFamily.regular,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.medium,
  },
  specimenContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  specimenItem: {
    padding: theme.spacing.m,
  },
  specimenLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: theme.typography.fontFamily.regular,
  },
  specimenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specimenType: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.medium,
  },
  specimenDetails: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  testResultItem: {
    paddingVertical: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  testName: {
    fontSize: 14,
    color: '#333',
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: 4,
  },
  testResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  testValue: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.bold,
  },
  referenceRange: {
    fontSize: 12,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
  },
  viewButtonContainer: {
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
    padding: theme.spacing.m,
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
    fontSize: 16,
    color: theme.colors.error,
    fontFamily: theme.typography.fontFamily.medium,
  },
  retryButton: {
    marginTop: theme.spacing.l,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.medium,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: theme.spacing.m,
    fontSize: 16,
    color: '#666',
    fontFamily: theme.typography.fontFamily.regular,
  },
});

export default ResultsListingScreen;
