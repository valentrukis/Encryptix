import { protocol } from "./config";
import { host } from "./config";
import axios from "axios";

export const logUser = async ({email, password}) => {
  try {
    const config = {
      method: "POST",
      url: protocol + host + "/api/users/login",
      data: {
        email: email,
        password: password,
      },
    };
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    console.error(error);
  }
};
