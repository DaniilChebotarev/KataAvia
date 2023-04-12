import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTickets } from './ticketSlice';

async function getTickets() {
  const searchId = localStorage.getItem('ID');
  const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
  if (!res.ok) {
    throw new Error('Fetch error');
  }

  return res.json();
}

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch, rejectWithValue }) => {
  let stop = false;
  let count = 0;
  while (!stop) {
    try {
      const data = await getTickets();
      dispatch(addTickets(data.tickets));
      stop = data.stop;
      count = 0;
    } catch (e: any) {
      count++;
      if (count > 3) {
        return rejectWithValue(e.message);
      }
    }
  }
});
