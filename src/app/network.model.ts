export interface NetworkState {
  state: 'success' | 'client error' | 'network error' | 'default';
  name: string;
}
