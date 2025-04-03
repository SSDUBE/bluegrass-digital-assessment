import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { InfoItem } from '../types';
import { theme } from '../theme';

interface InfoCardProps {
  items: InfoItem[];
  style?: object;
}

/**
 * InfoCard - A reusable component to display information in a card format
 *
 * @param items - Array of information items to display
 * @param style - Optional custom styles to apply to the card
 */
const InfoCard: React.FC<InfoCardProps> = ({ items, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.infoRow}>
        {items.map((item, index) => (
          <View key={index} style={styles.infoColumn}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            {item.isLink ? (
              <TouchableOpacity
                onPress={item.onPress}
                accessibilityRole="button"
                accessibilityLabel={`${item.label}: ${item.value}`}>
                <View style={styles.linkContainer}>
                  <Text style={styles.linkText}>{item.value}</Text>
                  {item.icon && (
                    <FontAwesome
                      name={item.icon}
                      size={theme.typography.fontSizes.xs}
                      color={item.iconColor || theme.colors.primary}
                      style={styles.icon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.infoValue}>{item.value}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: theme.typography.fontSizes.xs,
    color: '#666',
    marginBottom: theme.spacing.xs / 2,
  },
  infoValue: {
    fontSize: theme.typography.fontSizes.s,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeights.medium,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: theme.typography.fontSizes.s,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeights.medium,
  },
  icon: {
    marginLeft: theme.spacing.xs,
  },
});

export default InfoCard;
