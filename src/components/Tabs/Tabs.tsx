import { useAppDispatch } from '../../hooks/redux';
import classes from './Tabs.module.scss';
import { useState } from 'react';
import { sortByPrice, sortByFast } from '../../store/ticketSlice';

const Tabs = () => {
  const [cheapTabActive, setCheapTabActive] = useState(false);
  const [fastTabActive, setFastTabActive] = useState(false);
  const [optimalTabActive, setOptimalTabActiver] = useState(false);

  const dispatch = useAppDispatch();

  let classCheap: string = classes.buttons__item;
  if (cheapTabActive) {
    classCheap = classes['buttons__item--active'];
  } else classCheap = classes.buttons__item;

  let classFast: string = classes.buttons__item;
  if (fastTabActive) {
    classFast = classes['buttons__item--active'];
  } else classFast = classes.buttons__item;

  let classOptimal: string = classes.buttons__item;
  if (optimalTabActive) {
    classOptimal = classes['buttons__item--active'];
  } else classOptimal = classes.buttons__item;

  return (
    <div className={classes.buttons}>
      <button
        className={classCheap}
        onClick={() => {
          setCheapTabActive(true);
          setFastTabActive(false);
          setOptimalTabActiver(false);
          dispatch(sortByPrice());
        }}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={classFast}
        onClick={() => {
          setCheapTabActive(false);
          setFastTabActive(true);
          setOptimalTabActiver(false);
          dispatch(sortByFast());
        }}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={classOptimal}
        onClick={() => {
          setCheapTabActive(false);
          setFastTabActive(false);
          setOptimalTabActiver(true);
        }}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

export default Tabs;
