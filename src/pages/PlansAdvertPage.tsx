import { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { API_URL } from '../config';

interface Data {
  id: string;
  month: string;
  group: string;
  amount: number;
  is_active: boolean;
  company: {
    name: string;
  };
  date: string;
}

export default function PlansAdvertPage() {
  const [plans, setPlans] = useState<Data[]>([]);

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch(`${API_URL}/plans`, { method: 'GET' });
      const body = await res.json();
      setPlans(
        body.advert.sort((a: Data, b: Data) => {
          if (!a.is_active && b.is_active) return 1;
          if (a.is_active && !b.is_active) return -1;
          return 0;
        })
      );
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ height: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Группа товаров</TableCell>
              <TableCell>Компания</TableCell>
              <TableCell>Бюджет, руб</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.group}
                </TableCell>
                <TableCell>{row.company.name}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.is_active ? 'Активна' : 'Завершена'}</TableCell>
                <TableCell>{moment(row.date, 'x').format('DD.MM.YYYY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
