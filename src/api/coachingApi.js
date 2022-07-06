import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class CoachingApi extends Api {
  getList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/coaching/list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT STUDENT: ", res.data);
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getMyList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/coaching/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT STUDENT: ", res.data);
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
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
      let res = await axios.post(
        `${API_BASE_URL}/coaching/create`,
        {
          coaching: data,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      // console.log("GOT STUDENT: ", res.data);
      if (res.status === 200) {
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
      let res = await axios.post(
        `${API_BASE_URL}/coaching/get_info`,
        {
          coaching_id: coaching_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT STUDENT: ", res.data);
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
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
      const res = await axios.post(
        `${API_BASE_URL}/coaching/join`,
        {
          coaching_id: coaching_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT STUDENT: ", res.data);
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
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
