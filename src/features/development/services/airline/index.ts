import axios from "axios";

import { Airline } from "./types";

import { Service } from "@/services";

const airlineService = new Service<Airline>({
  endpoint: "https://api.instantwebtools.net/v1/airlines",
  request: axios,
});

export default airlineService;
