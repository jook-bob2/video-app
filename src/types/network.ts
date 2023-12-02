import { AxiosError, AxiosResponse } from 'axios';

export interface ErrorType extends AxiosError {}

export interface ResponseType<T> extends AxiosResponse {
  data: T;
}
