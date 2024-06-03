import InputField from '../components/UI/Input';
import { images } from '../config/images';

export default function LoginPage() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121',
      }}
    >
      <div className="content" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div
          className="qr"
          style={{
            maxWidth: '250px',
            padding: '0 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <div className="title" style={{ fontSize: '24px', color: '#fff', fontWeight: '600', textAlign: 'center' }}>
            Быстрый вход по QR-коду
          </div>
          <img src={images.qr_code} alt="qr code" style={{ width: '180px', aspectRatio: '1 1' }} />
        </div>
        <div
          className="form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '15px',
            color: '#fff',
            maxWidth: '400px'
          }}
        >
          <img src={images.brand_logo} alt="brand logo" style={{ height: '60px', width: '192px' }} />
          <div
            className="info"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              textAlign: 'center'
            }}
          >
            <div className="title" style={{ fontSize: '24px', fontWeight: '600' }}>
              Введите номер телефона
            </div>
            <div className="subtitle">Ваш номер телефона будет использоваться для входа в аккаунт</div>
          </div>
          <InputField type="phone" name="phone" placeholder="Номер телефона" label="Номер телефона" />
          <div className="actions" style={{ display: 'flex', width: '100%' }}>
            <button
              type="submit"
              style={{
                padding: '10px 4px',
                width: '100%',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '24px',
                color: '#8774e1',
                backgroundColor: 'transparent',
                borderRadius: '12px',
              }}
            >
              Войти
            </button>
          </div>
          <div className="new" style={{ color: '#8F92A1', fontSize: '14px', fontWeight: 600 }}>
            Нет учетной записи? <span style={{ color: '#FF1451', cursor: 'pointer' }}>Зарегистрироваться</span>
          </div>
        </div>
      </div>
    </div>
  );
}
