import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, styled } from '@mui/material';
import React, { useEffect } from 'react';

interface ModalNodeProps {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px;
  max-height: 90vh;
  overflow-y: auto;
  padding-top: 36; /* 閉じるボタン分のスペースを確保 */
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
`;

export const ModalNode: React.FC<ModalNodeProps> = ({
  open,
  onClose,
  content,
}) => {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="marker-modal-title"
      aria-describedby="marker-modal-description"
    >
      <StyledModalBox>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
        {content}
      </StyledModalBox>
    </Modal>
  );
};
