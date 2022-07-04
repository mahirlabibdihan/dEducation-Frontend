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
  apply = async (post_id, token) => {
    console.log("APPLY TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/apply`,
        {
          // tutor_id: tutor_id,
          post_id: post_id,
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
  getApplicants = async (id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/get_applicants`,
        {
          post_id: id,
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
  offer = async (data, tutor_id, token) => {
    console.log("OFFER TUTION");
    console.log("ID:", tutor_id);
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/offer`,
        {
          tution: data,
          tutor_id: tutor_id,
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
  getOffers = async (token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.get(`${API_BASE_URL}/tution/offer`, {
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
  getOffer = async (student_id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/get_offer`,
        {
          student_id: student_id,
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
