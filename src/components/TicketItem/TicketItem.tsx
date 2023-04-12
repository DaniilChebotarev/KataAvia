import classes from './TicketItem.module.scss';
import { TicketType } from '../../types/ticket';
import { getTimeFromMins, convertDate } from '../../utils/time';
import { numberOfTransfer } from '../../utils/transfer';
import { transformPrice } from '../../utils/price';
import { useMemo } from 'react';

const TicketItem = ({ price, segments, carrier }: TicketType) => {
  const priceStr = useMemo<string>(() => transformPrice(price), [price]);

  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <span className={classes.ticket__price}>{priceStr} Р</span>
        <img className={classes.ticket__img} src={`//pics.avs.io/99/36/${carrier}.png`} alt="airlines" />
      </div>
      <div className={classes.ticket__content}>
        <div className={classes.ticket__wrapper}>
          <div className={classes.head}>MOW - HKT</div>
          <div className={classes.content}>{convertDate(segments[0].date, segments[0].duration)}</div>
        </div>
        <div className={classes.ticket__wrapper}>
          <div className={classes.head}>В ПУТИ</div>
          <div className={classes.content}>{getTimeFromMins(segments[0].duration)}</div>
        </div>
        <div className={classes.ticket__wrapper}>
          <div className={classes.head}>{numberOfTransfer(segments[0].stops)}</div>
          <div className={classes.content}>{segments[0].stops.join(', ')}</div>
        </div>
        <div className={classes.ticket__wrapper}>
          <div className={classes.head}>MOW-HKT</div>
          <div className={classes.content}>{convertDate(segments[1].date, segments[1].duration)}</div>
        </div>
        <div className={classes.ticket__wrapper}>
          <div className={classes.head}>В ПУТИ</div>
          <div className={classes.content}>{getTimeFromMins(segments[1].duration)}</div>
        </div>
        <div className={classes.ticket__wrapper}>
          <div className={classes.head}>{numberOfTransfer(segments[1].stops)}</div>
          <div className={classes.content}>{segments[1].stops.join(', ')}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
