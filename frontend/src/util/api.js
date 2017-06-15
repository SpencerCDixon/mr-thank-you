const isProd = process.env.NODE_ENV === 'production';

export const websocketUrl = isProd ? 'wss://mrthankyou.herokuapp.com/ws' : 'ws://localhost:3001/ws';
export const apiUrl = isProd ? 'https://mrthankyou.herokuapp.com' : 'http://localhost:3001';

