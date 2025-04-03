export const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        color: '#10b981',
      };
    case 'pending':
      return {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: '#f59e0b',
      };
    case 'processing':
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: '#3b82f6',
      };
    default:
      return {
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        color: '#9ca3af',
      };
  }
};
