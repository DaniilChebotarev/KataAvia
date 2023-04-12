import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import Tabs from '../Tabs/Tabs';
import TicketList from '../TicketList/TicketList';
import classes from './App.module.scss';
import aviaService from '../../services/services';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Alert } from 'antd';
import { useAppSelector } from '../../hooks/redux';

function App() {
  const { error, status } = useAppSelector((state) => state.ticketReducer);
  const checkbox = useAppSelector((state) => state.ticketReducer.panel);

  useEffect(() => {
    const load = async () => {
      const res = await aviaService.getId();
      localStorage.setItem('ID', res.searchId);
    };

    load();
  }, []);

  const content = (
    <div className={classes.app}>
      <Header />
      <Tabs />
      {status === 'loading' && <Loader />}
      <Aside />
      {checkbox.every((el) => !el.isChecked) === false ? (
        <TicketList />
      ) : (
        <h1 className={classes.app__unknown}> Мы ничего не нашли</h1>
      )}
    </div>
  );

  const alert = <Alert message="Поиск не дал результатов. Попробуйте перезагрузить страницу." type="error" showIcon />;

  return <>{error ? alert : content} </>;
}

export default App;
