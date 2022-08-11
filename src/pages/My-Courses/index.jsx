import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import CourseController from "../../controller/courseController";
import CourseContainer from "../../components/Containers/CourseContainer";
import Cookies from "universal-cookie";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
import AddCourseForm from "../../components/Forms/AddCourseForm";
import CreateCourseForm from "../../components/Forms/CreateCourseForm";
const cookies = new Cookies();
const courseController = new CourseController();

const MyCourses = () => {
  const globalCtx = useContext(GlobalContext);
  const [courseList, setCourseList] = useState([]);
  const type = cookies.get("type");
  const setList = async () => {
    if (type === "TUTOR") {
      const list = await courseController.getMyListAdmin();
      setCourseList(list.data);
    } else {
      const list = await courseController.getMyList();
      setCourseList(list.data);
    }
  };
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    if (globalCtx.pendingUpdate) {
      setList();
      globalCtx.setPendingUpdate(false);
    }
  }, [globalCtx.pendingUpdate]);

  const CourseList = () => {
    return <CourseContainer header="My Courses" list={courseList} />;
  };

  return (
    <MainContainer className="my-course-container">
      <CourseList />
      <RightPanel>
        {type === "TUTOR" ? <CreateCourseForm /> : <AddCourseForm />}
      </RightPanel>
    </MainContainer>
  );
};

export default MyCourses;
