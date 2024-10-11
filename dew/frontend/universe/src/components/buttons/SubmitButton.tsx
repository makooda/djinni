import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SubmitButtonProps {
  loading?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
}));

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  onClick,
  icon,
  label,
}) => {
  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={loading}
      style={{ marginTop: '16px' }}
    >
      {loading && <CircularProgress size={24} style={{ position: 'absolute' }} />}
      {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
      {label}
    </StyledButton>
  );
};

export default SubmitButton;
