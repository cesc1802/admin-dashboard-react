import { Airline } from "../airline/types";

export interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline[];
  __v: number;
}

export interface PassengerServiceListQueryParams extends Record<string, unknown> {
  page: number;
  size: number;
}

export interface PassengerServiceListResponse {
  data: Passenger[];
  totalPassengers: number;
  totalPages: number;
}
