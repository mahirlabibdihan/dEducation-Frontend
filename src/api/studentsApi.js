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
}

export default StudentsApi;
