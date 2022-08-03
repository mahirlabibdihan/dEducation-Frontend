import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class StudentsApi extends Api {
  getMyStudentsList = async (token) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/students/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
      // console.log("GOT STUDENT: ", result);
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
  getPendingStudentsList = async (token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.get(`${API_BASE_URL}/students/pending_list`, {
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
  getEnrolledStudentsList = async (data, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/students/enrolled_list`,
        {
          course: data,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
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
  getMembersList = async (coaching_id, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/students/members_list`,
        {
          coaching_id: coaching_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
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

export default StudentsApi;
