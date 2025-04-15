import { useState, useCallback } from 'react';

/**
 * Custom hook to manage the contact modal visibility
 */
export const useContactModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    closeModal,
    showModal,
  };
};
