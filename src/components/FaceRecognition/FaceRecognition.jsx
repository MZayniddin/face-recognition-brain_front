import "./FaceRecognition.css";

const FaceRecognition = ({ imgURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imgURL}
          width={500}
          height={"auto"}
          alt=""
        />
        <div
          className="bounding-box"
          style={{
            top: box?.topRow,
            right: box?.rightCol,
            bottom: box?.bottomRow,
            left: box?.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
