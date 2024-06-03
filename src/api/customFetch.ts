export {};
// import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { Mutex } from 'async-mutex';
// import { logout } from '../features/auth';
// import { API_URL } from '@config/index';

// // Create a new mutex
// const mutex = new Mutex();

// const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

// const customFetch: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
//   // Подождите, пока мутекс не будет доступен, не зафиксируя его
//   await mutex.waitForUnlock();

//   let result = await baseQuery(args, api, extraOptions);

//   if ((result.error?.data as any)?.message === 'You are not logged in') {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();

//       try {
//         const refreshResult = await baseQuery({ credentials: 'include', url: 'auth/refresh' }, api, extraOptions);

//         if (refreshResult.data) {
//           // Retry the initial query
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           api.dispatch(logout());
//           window.location.href = '/login';
//         }
//       } finally {
//         // Выпуск должен быть вызван, как только мутекс должен быть выпущен снова.
//         release();
//       }
//     } else {
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };

// export default customFetch;
