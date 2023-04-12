import { useEffect, useState } from 'react';
import classes from './Aside.module.scss';
import { handleChange } from '../../store/ticketSlice';
import { Panel } from '../../types/panel';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
const Aside = () => {
  const [users, setUsers] = useState<Panel[]>([]);
  const dispatch = useAppDispatch();
  const panel = useAppSelector((state) => {
    return state.ticketReducer.panel;
  });

  useEffect(() => {
    setUsers(panel);
  }, [panel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    dispatch(handleChange({ name, checked }));
  };

  return (
    <aside className={classes.aside}>
      <span className={classes.aside__quantity}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <label key={4} className={classes.aside__label}>
        <input
          type="checkbox"
          className={classes.aside__input}
          name="allSelect"
          checked={!users.some((user) => !user.isChecked)}
          onChange={handleInputChange}
        />
        <span>Все</span>
      </label>
      {users.map((user) => (
        <label key={user.id} className={classes.aside__label}>
          <input
            type="checkbox"
            className={classes.aside__input}
            name={user.label}
            onChange={handleInputChange}
            checked={user?.isChecked || false}
          />
          <span>{user.label}</span>
        </label>
      ))}
    </aside>
  );
};

export default Aside;
