import { Box, Card, CardActionArea, CardContent, CardMedia, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { images } from '../config/images';
import { API_URL } from '../config';

type CardType = {
  id: string;
  ru_name: string;
  en_name: string;
  is_basic: boolean;
  region: string;
  type: string;
};

export default function WarehousePage() {
  const [warehouse, setWarehouse] = useState<CardType[]>([]);
  const [filtered, setFiltered] = useState<CardType[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      const res = await fetch(`${API_URL}/wh`, { method: 'GET' });
      const body = await res.json();
      const sorted: CardType[] = body.data.sort((a: CardType, b: CardType) => {
        if (!a.is_basic && b.is_basic) return 1;
        if (a.is_basic && !b.is_basic) return -1;
        return 0;
      });
      setWarehouse(sorted);
      setFiltered(sorted);
    }
  }, []);

  function handleChangeFilter(type: string) {
    if (type === 'All') {
      setFilter('All');
      setFiltered(warehouse);
    }
    if (type === 'Wildberries') {
      const fdata = warehouse.filter((item) => item.type === 'wber');
      setFilter('Wildberries');
      setFiltered(fdata);
    }
    if (type === 'Ozon') {
      const fdata = warehouse.filter((item) => item.type === 'ozon');
      setFilter('Ozon');
      setFiltered(fdata);
    }
    if (type === 'Used') {
      const fdata = warehouse.filter((item) => item.is_basic);
      setFilter('Used');
      setFiltered(fdata);
    }
    if (type === 'Unused') {
      const fdata = warehouse.filter((item) => !item.is_basic);
      setFilter('Unused');
      setFiltered(fdata);
    }
  }

  function handleChangeIsBasic(id: string, type: string) {
    const newWh = warehouse.map((item) => {
      if (item.id === id && item.type === type) {
        return {
          ...item,
          is_basic: !item.is_basic,
        };
      }
      return item;
    });
    const newFiltered = filtered.map((item) => {
      if (item.id === id && item.type === type) {
        return {
          ...item,
          is_basic: !item.is_basic,
        };
      }
      return item;
    });
    setWarehouse(newWh);
    setFiltered(newFiltered);
  }

  function isActive(type: string) {
    return filter === type ? 'active' : '';
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '16px', p: '12px 8px', fontSize: '14px', alignItems: 'center' }}>
        <Typography style={{ fontWeight: 600 }}>Показать:</Typography>
        <div
          className={`tag ${isActive('All')}`}
          onClick={() => {
            handleChangeFilter('All');
          }}
        >
          Все
        </div>
        <div
          className={`tag ${isActive('Wildberries')}`}
          onClick={() => {
            handleChangeFilter('Wildberries');
          }}
        >
          Wildberries
        </div>
        <div
          className={`tag ${isActive('Ozon')}`}
          onClick={() => {
            handleChangeFilter('Ozon');
          }}
        >
          Ozon
        </div>
        <div className="h-div"></div>
        <div
          className={`tag ${isActive('Used')}`}
          onClick={() => {
            handleChangeFilter('Used');
          }}
        >
          Используются
        </div>
        <div
          className={`tag ${isActive('Unused')}`}
          onClick={() => {
            handleChangeFilter('Unused');
          }}
        >
          Не используются
        </div>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', m: '20px 0' }}>
        {filtered.map(({ id, type, ru_name, region, is_basic }) => (
          <Card
            sx={{
              width: 200,
              minHeight: 130,
              backgroundColor: is_basic ? '#E3F5FF' : '#ECEFF3',
              boxShadow: 'none',
              borderRadius: '16px',
            }}
            key={id}
          >
            <CardActionArea style={{ height: '100%' }}>
              <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="type" style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={type === 'wber' ? images.wber_logo : images.ozon_logo}
                    alt="warehouse type"
                    style={{ width: '12px', height: '12px', borderRadius: '4px', marginRight: '4px' }}
                  />
                  <span style={{ fontWeight: 600, color: type === 'wber' ? '#4B1175' : '#005CFF' }}>
                    {type === 'wber' ? 'Wildberries' : 'Ozon'}
                  </span>
                </div>
                <div className="name" style={{ color: '#000', fontSize: '20px', fontWeight: 600 }}>
                  {ru_name.replaceAll('_', ' ')}
                </div>
                <div className="region" style={{ color: '#979797', fontSize: '12px', fontWeight: 600 }}>
                  {region}
                </div>
                <Switch
                  checked={is_basic}
                  onChange={() => {
                    handleChangeIsBasic(id, type);
                  }}
                  size="small"
                />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
