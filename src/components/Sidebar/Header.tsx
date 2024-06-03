import { type FC } from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

type HeaderProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Header: FC<HeaderProps> = ({ isOpen, onClose }) => {
  return (
    <Box sx={{ p: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: '#fff' }}>
      <div
        className="logo"
        style={{ cursor: 'pointer', fontWeight: 600, fontSize: 24, display: isOpen ? 'block' : 'none', overflow: 'hidden', textWrap: 'nowrap' }}
      >
        Newmax Tech
      </div>
      <IconButton
        onClick={onClose}
        sx={{
          textWrap: 'nowrap',
          overflow: 'hidden',
          ':hover': {
            backgroundColor: '#333333',
            svg: {
              color: '#BFB2FF !important',
            },
          },
        }}
      >
        <Icon icon="mynaui:sidebar" color="#9E9E9E"></Icon>
      </IconButton>
    </Box>
  );
};

export default Header;
