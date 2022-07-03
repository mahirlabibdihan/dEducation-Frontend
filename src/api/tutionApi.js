import { data } from "autoprefixer";
import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class TutionApi extends Api {
  post = async (data, token) => {
    console.log("POST TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/post`,
        {
          tution: data,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
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
  getMyList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tution/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
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
  getList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tution/list`, {
        headers: { authorization: "Bearer " + token },
      });
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

export default TutionApi;
