import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { API_URL } from '../config';

interface Data {
  id: string;
  month: string;
  group: string;
  salesQty: number;
  salesAmount: number;
  orderQty: number;
  orderAmount: number;
  profitAmount: number;
  company: {
    name: string;
  };
  date: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'group',
    numeric: false,
    disablePadding: false,
    label: 'Группа товаров',
  },
  {
    id: 'company',
    numeric: false,
    disablePadding: false,
    label: 'Компания',
  },
  {
    id: 'salesAmount',
    numeric: true,
    disablePadding: false,
    label: 'Продажи, руб',
  },
  {
    id: 'salesQty',
    numeric: true,
    disablePadding: false,
    label: 'Продажи, шт',
  },
  {
    id: 'ordersAmount',
    numeric: true,
    disablePadding: false,
    label: 'Заказы, руб',
  },
  {
    id: 'oredersQty',
    numeric: true,
    disablePadding: false,
    label: 'Заказы, шт',
  },
  {
    id: 'profitAmount',
    numeric: true,
    disablePadding: false,
    label: 'Прибыль, руб',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Дата',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function PlansSalesPage() {
  const [plans, setPlans] = useState<Data[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('date');

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch(`${API_URL}/plans`, { method: 'GET' });
      const body = await res.json();
      setPlans(body.selling);
    }
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ height: 'clalc(100% - 10px)' }}>
          <Table stickyHeader>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {plans.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.group}
                  </TableCell>
                  <TableCell>{row.company.name}</TableCell>
                  <TableCell align="right">{row.salesAmount}</TableCell>
                  <TableCell align="right">{row.salesQty}</TableCell>
                  <TableCell align="right">{row.orderAmount}</TableCell>
                  <TableCell align="right">{row.orderQty}</TableCell>
                  <TableCell align="right">{row.profitAmount}</TableCell>
                  <TableCell>{moment(row.date, 'x').format('DD.MM.YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
