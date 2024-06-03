import { useState, type FC } from 'react';
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import SidebarProfile from './SidebarProfile';
import { Logout, PersonAdd, Settings, LightMode, DarkMode, SupportAgent } from '@mui/icons-material';

type BottomProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const Bottom: FC<BottomProps> = ({ isOpen, onClose }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <SidebarProfile isOpen={isOpen} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              ml: 3,
              p: '0 8px',
              overflow: 'visible',
              bgcolor: '#333333',
              color: 'rgba(255, 255, 255, .5)',
              borderRadius: '8px',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '& svg': {
                color: 'rgba(255, 255, 255, .5)',
              },
              '& .RedMenuItem': {
                color: '#E55D57',
                '& svg': {
                  color: '#E55D57',
                },
              },
              '& li': {
                p: '8px 12px',
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: 'rgba(28, 28, 28, .4)',
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Настройки
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SupportAgent fontSize="small" />
          </ListItemIcon>
          Поддержка
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>{true ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}</ListItemIcon>
          Светлая тема
        </MenuItem>
        <MenuItem onClick={handleClose} classes={{ root: 'RedMenuItem' }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Bottom;
