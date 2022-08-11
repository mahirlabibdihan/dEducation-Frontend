import "./MainContainer.scss";
const MainContainer = (props) => {
  return (
    <div className={`main-container ${props.className}`}>{props.children}</div>
  );
};

export default MainContainer;
