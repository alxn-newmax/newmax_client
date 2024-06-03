import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { API_URL } from '../config';

export default function DataPage() {
  const [warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch(`${API_URL}/wh`, { method: 'GET' });
      const body = await res.json();
      setWarehouse(body.data);
    }
  });

  return (
    <Box>
      {warehouse.map((item, i) => (
        <div>123</div>
      ))}
    </Box>
  );
}
