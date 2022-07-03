import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class TutorsApi extends Api {
  getTutorsList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tutors`, {
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
}

export default TutorsApi;
