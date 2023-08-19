import { apiSlice } from './apiSlice';
const USERS_URL = '/api/notes';

export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateNoteMutation } = noteApiSlice;
