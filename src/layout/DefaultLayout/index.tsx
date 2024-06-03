import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';

interface DefaultLayoutProps extends React.PropsWithChildren {
  children?: ReactElement;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      {children ? children : <Outlet />}
    </Box>
  );
};

export default DefaultLayout;
