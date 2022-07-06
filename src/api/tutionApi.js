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

  getApplicants = async (post_id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/get_applicants`,
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

  acceptOffer = async (student_id, token) => {
    console.log("ACCEPT OFFER");
    console.log("ID:", student_id);
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/accept`,
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
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };

  rejectOffer = async (student_id, token) => {
    console.log("OFFER TUTION");
    console.log("ID:", student_id);
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/reject`,
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
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };

  getMyOffers = async (token) => {
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
  getOfferFromStudent = async (student_id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/get_offer_student`,
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
  getOfferFromTutor = async (tutor_id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/get_offer_tutor`,
        {
          tutor_id: tutor_id,
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
  getOfferFromPost = async (post_id, token) => {
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tution/by_post`,
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
