import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../store/GlobalContext";
import CourseController from "../../controller/courseController";
import { BatchForm } from "../../components/Forms/BatchForm";
import BatchContainer from "../../components/Containers/BatchContainer";
import { useSearchParams } from "react-router-dom";
import RightPanel from "../../components/Panels/RightPanel";
import MainContainer from "../../components/Containers/MainContainer";
const courseController = new CourseController();

const Batches = () => {
  const globalCtx = useContext(GlobalContext);
  const [batchList, setBatchList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const setList = async () => {
    const list = await courseController.getBatches(
      searchParams.get("course_id")
    );
    setBatchList(list.data);
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

  const BatchList = () => {
    return <BatchContainer header="Batches" list={batchList} />;
  };
  return (
    <MainContainer className="batch-container">
      <BatchList />
      <RightPanel>
        <BatchForm />
      </RightPanel>
    </MainContainer>
  );
};

export default Batches;
