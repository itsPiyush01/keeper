import axios from "axios";
const instance = axios.create({
	baseURL: "https://keeper-app-bd970-default-rtdb.firebaseio.com",
});

axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
export default instance;
