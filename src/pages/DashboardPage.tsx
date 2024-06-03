import { Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        p: '30px',
        maxWidth: 'calc(100vw - 290px)',
        gap: '20px',
      }}
    >
      <h1>Общая статистика</h1>
    </Box>
  );
}
