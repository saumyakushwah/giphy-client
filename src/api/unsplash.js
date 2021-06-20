import axios from "axios";

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: "Client-ID j1KVz3ILXDTrnOrtIhlYckQMPqZ5OqtzYPKx_rWDhGo",
  }
});
