import { API } from "../configs/config";

class BaseService {
	async fetch(url, options, authenticate = false, role = "user") {
		if (authenticate) {
			let token = localStorage.getItem("token");
			if (role === "admin") {
				token = localStorage.getItem("tokenAdmin");
			}
			options.headers = {
				authorization: `${token}`,
			};
		}

		options.credentials = "include";
		options.headers = {
			...options.headers,
			"Content-Type": "application/json",
		};

		const response = await fetch(API + url, options);

		return await response.json();
	}
}

export default BaseService;
