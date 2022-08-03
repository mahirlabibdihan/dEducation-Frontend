import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class TutorsApi extends Api {
  getTutorsList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tutors/list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT TUTORS: ", res.data);
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
  getMyTutorsList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tutors/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT TUTORS: ", res.data);
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
  getApplicantsList = async (post_id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tutors/applicants_list`,
        {
          post_id: post_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
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

export default TutorsApi;
