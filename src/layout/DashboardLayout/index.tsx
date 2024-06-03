import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function DashboardLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        p: '30px',
        maxWidth: 'calc(100vw - 290px)',
      }}
    >
      <h1>Общая статистика</h1>
      <div id="table-container" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Outlet />
      </div>
    </Box>
  );
}
