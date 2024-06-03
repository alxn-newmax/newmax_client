import { Button, TextField } from '@mui/material';
import { TGWEB_URL } from '../config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export type OrderStatus = 'unread' | 'read' | 'fabric' | 'sewing' | 'not started' | 'production' | 'delivery' | 'done';
export interface IOrder {
  id: string;
  key: string;
  index: number;
  doc_link: string;
  doc_title: string;
  doc_date: string;
  status: OrderStatus;
  photo_fabric?: string;
  photo_sewing?: string;
  photo_invoice?: string;
  fk_user_id: string;
  fk_article_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function TgWebOrders() {
  const { order_key } = useParams();

  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${TGWEB_URL}/orders/${order_key}`);
      const { data, message } = await response.json();
      console.log({ data, message });
      setOrder(data);
    };

    fetchData();
  }, [order_key]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <h1>Order {order_key}</h1>
        {order && order.doc_date}
        <TextField id="outlined-multiline-static" label="Multiline" multiline rows={4} defaultValue="Default Value" />
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
    </div>
  );
}
