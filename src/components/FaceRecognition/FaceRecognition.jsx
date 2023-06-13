const FaceRecognition = ({ imgURL }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imgURL} width={500} height={"auto"} alt="image" />
      </div>
    </div>
  );
};

export default FaceRecognition;
