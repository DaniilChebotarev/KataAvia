import { createSlice } from '@reduxjs/toolkit';
import { Panel } from '../types/panel';
import { fetchTickets } from './actionCreators';
import { TicketType } from '../types/ticket';
import { orderBy, maxBy } from 'lodash';

const panel: Panel[] = [
  { label: 'Без пересадок', id: 0, isChecked: true, stopsCount: 0 },
  { label: '1 пересадка', id: 1, isChecked: true, stopsCount: 1 },
  { label: '2 пересадка', id: 2, isChecked: true, stopsCount: 2 },
  { label: '3 пересадка', id: 3, isChecked: true, stopsCount: 3 },
];

type AviaState = {
  ticket: TicketType[];
  panel: Panel[];
  status: string;
  error: null | boolean;
  showTickets: number;
};

const initialState: AviaState = {
  ticket: [],
  panel: panel,
  status: '',
  error: null,
  showTickets: 5,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,

  reducers: {
    sortByPrice(state) {
      const ticket = state.ticket;
      state.ticket = orderBy(ticket, ['price'], ['asc']);
    },

    sortByFast(state) {
      const ticket = state.ticket;
      state.ticket = orderBy(ticket, (el) => maxBy(el.segments, 'duration')?.duration, 'asc');
    },

    addTickets(state, action) {
      state.ticket = [...state.ticket, ...action.payload];
    },
    handleChange(state, action) {
      const { name, checked } = action.payload;
      if (name === 'allSelect') {
        state.panel = state.panel.map((user) => {
          return { ...user, isChecked: checked };
        });
      } else {
        state.panel = state.panel.map((user) => (user.label === name ? { ...user, isChecked: checked } : user));
      }
    },
    showMoreTickets(state) {
      state.showTickets += 5;
    },
  },
  extraReducers: {
    [fetchTickets.fulfilled.type]: (state) => {
      state.status = 'resolved';
      // state.ticket = actions.payload;
    },
    [fetchTickets.pending.type]: (state) => {
      state.status = 'loading';
    },
    [fetchTickets.rejected.type]: (state) => {
      state.status = 'rejected';
      state.error = true;
    },
  },
});

export const { handleChange, addTickets, showMoreTickets, sortByPrice, sortByFast } = ticketSlice.actions;

export default ticketSlice.reducer;
