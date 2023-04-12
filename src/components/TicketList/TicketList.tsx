import { fetchTickets } from '../../store/actionCreators';
import TicketItem from '../TicketItem/TicketItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './TicketList.module.scss';
import { useEffect } from 'react';
import { showMoreTickets } from '../../store/ticketSlice';
import { nanoid } from 'nanoid';
import { TicketType } from '../../types/ticket';
import { useState } from 'react';

const TicketList = () => {
  const [filteredTickets, setFilteredTickets] = useState<TicketType[]>([]);

  const dispatch = useAppDispatch();
  const { ticket, showTickets } = useAppSelector((state) => state.ticketReducer);
  const checkbox = useAppSelector((state) => state.ticketReducer.panel);

  useEffect(() => {
    const filters = checkbox.filter((el) => el.isChecked);
    const variable = ticket.filter((el) => {
      const data1 = el.segments[0].stops.length;
      const data2 = el.segments[1].stops.length;
      return filters.some((elem) => elem.stopsCount === data1 || elem.stopsCount === data2);
    });
    setFilteredTickets(variable);
    dispatch(fetchTickets());
  }, [checkbox, ticket]);

  const visibleTickets = filteredTickets.slice(0, showTickets);

  const aviaItems = visibleTickets.map((item) => <TicketItem key={nanoid()} {...item} />);

  return (
    <div className={classes.allTickets}>
      {aviaItems}
      <div className={classes.showMore}>
        <button onClick={() => dispatch(showMoreTickets())} className={classes.showMore__btn}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      </div>
    </div>
  );
};

export default TicketList;
