import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notFound__container">
      <h2 className="notFound__title">Страница не найдена!</h2>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
