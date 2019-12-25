import jsonServerProvider from "ra-data-json-server";
import { server_ip, server_port } from "./attrs";

const mockDataProvider = jsonServerProvider(server_ip + ":" + server_port);

export default mockDataProvider;
