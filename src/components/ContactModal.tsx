import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { theme } from '../theme';
import Button from './Button';

interface ContactModalProps {
  isVisible: boolean;
  onClose: () => void;
  doctorName: string;
  phoneNumber: string;
}

/**
 * A reusable modal component that displays contact information for results
 */
const ContactModal: React.FC<ContactModalProps> = ({
  isVisible,
  onClose,
  doctorName,
  phoneNumber,
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      style={styles.modal}
      onBackdropPress={handleClose}
      animationOutTiming={300}
      hideModalContentWhileAnimating={true}>
      <View style={styles.container}>
        <Text style={styles.title}>Contact for results</Text>
        <Text style={styles.message}>
          {doctorName} has requested that you contact him/her for your results on {phoneNumber}
        </Text>
        <Button title="OK" onPress={handleClose} variant="primary" fullWidth size="medium" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ContactModal;
