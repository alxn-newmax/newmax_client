import type { FC } from 'react';
import { Icon } from '@iconify/react';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Zoom } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type ContentProps = {
  list: SidebarListItem[];
  isOpen: boolean;
};

type SidebarListItem = {
  link: string;
  icon: string;
  label: string;
};

const Content: FC<ContentProps> = ({ list, isOpen }) => {
  const location = useLocation();
  const currentTab = location.pathname;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      {list.map((el, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <Tooltip
            TransitionComponent={Zoom}
            title={<div className="tooltip-text">{el.label}</div>}
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  display: isOpen ? 'none' : 'block',
                  bgcolor: '#1E1E1E',
                  borderRadius: '8px',
                  padding: '16px 32px',
                  '& .MuiTooltip-arrow': {
                    transform: 'translate(5px, 5px) !important',
                    color: '#1E1E1E !important',
                    marginLeft: '-1.71em !important',
                    height: '3em !important',
                    width: '1.71em !important',
                  },
                },
              },
            }}
          >
            <ListItemButton
              component={Link}
              to={el.link}
              classes={{ root: `ListItemButton ${currentTab === el.link ? 'active' : ''}` }}
              sx={{ justifyContent: isOpen ? 'initial' : 'center' }}
            >
              <ListItemIcon classes={{ root: 'ListItemIcon' }} sx={{ mr: isOpen ? 2 : 'auto' }}>
                <Icon icon={el.icon} />
              </ListItemIcon>
              <ListItemText primary={el.label} classes={{ root: 'ListItemText' }} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </Box>
  );
};

export default Content;
