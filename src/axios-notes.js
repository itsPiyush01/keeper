import axios from "axios";
const instance = axios.create({
	baseURL: "https://keeper-app-bd970-default-rtdb.firebaseio.com",
});

export default instance;
