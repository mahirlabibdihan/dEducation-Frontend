import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class CoachingApi extends Api {
  getList = async (token) => {
    try {
      let result = await axios.get(`${API_BASE_URL}/coaching/list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getMyList = async (token) => {
    console.log("GET COACHING");
    try {
      let result = await axios.get(`${API_BASE_URL}/coaching/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  create = async (data, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/coaching/create`,
        {
          coaching: data,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      // console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
        return {
          success: true,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getInfo = async (coaching_id, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/coaching/get_info`,
        {
          coaching_id: coaching_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  joinCoaching = async (coaching_id, token) => {
    try {
      const result = await axios.post(
        `${API_BASE_URL}/coaching/join`,
        {
          coaching_id: coaching_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
}

export default CoachingApi;
