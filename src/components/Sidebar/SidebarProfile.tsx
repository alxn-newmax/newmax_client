import { Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { images } from '../../config/images';

type SidebarProfileProps = {
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function SidebarProfile({ isOpen, onClick }: SidebarProfileProps) {
  return (
    <Box sx={{ p: '8px 0' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '8px',
          padding: '8px',
          ':hover': { backgroundColor: '#333333' },
        }}
        onClick={onClick}
      >
        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <img src={images.avatar} alt="avatar" style={{ width: '36px', height: '36px' }} />
          <Box sx={{ opacity: isOpen ? 1 : 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Box sx={{ fontSize: 16, color: '#fff', fontWeight: 600 }}>Brooklyn Simmons</Box>
            <Box sx={{ fontSize: 12, color: '#808080', fontWeight: 600 }}>brooklyn@simmons.com</Box>
          </Box>
        </Box>
        <ChevronRightIcon style={{ color: '#ffffff78', opacity: isOpen ? 1 : 0 }} />
      </Box>
    </Box>
  );
}
