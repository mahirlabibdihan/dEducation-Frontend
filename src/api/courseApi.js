import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class CourseApi extends Api {
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
    try {
      let result = await axios.get(`${API_BASE_URL}/courses/my_list`, {
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
}

export default CourseApi;
