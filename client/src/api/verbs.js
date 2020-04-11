import axios from "axios";

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

const serverPrefix = "http://localhost:4000/";

export const get = async (endpoint) => {
  try {
    endpoint = removeSlashPrefix(endpoint);
    const result = await axios.get(`${serverPrefix + endpoint}`);
    return result.data;
  } catch (error) {
    if (error.response?.status === 401) {
      window.location = "/login";
      return;
    }
    console.log(`Get ${endpoint} failed. ${error}`);
    throw error;
  }
};

export const post = async (endpoint, body) => {
  try {
    endpoint = removeSlashPrefix(endpoint);
    const result = await axios.post(`${serverPrefix + endpoint}`, body);
    return result.data;
  } catch (error) {
    if (error.response?.status === 401) {
      window.location = "/login";
      return;
    }
    console.log(`Post to ${endpoint} failed. ${error}`);
    throw error;
  }
};

const removeSlashPrefix = (endpoint) =>
  endpoint[0] === "/" ? endpoint.substr(1) : endpoint;
