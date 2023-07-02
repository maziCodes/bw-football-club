import { HttpHeaders } from '@angular/common/http';


export const environment = {
  production: true,
  baseUrl: 'https://api.football-data.org',
  headerToken: 'f76a97c0bad842ebaf7981a70d58355e',
  footballDataVersion: import.meta.env.NG_APP_FOOTBALL_DATA_VERSION
};
