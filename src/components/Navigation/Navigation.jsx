const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => onRouteChange(isSignedIn ? "signout" : "signin")}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign {isSignedIn ? "Out" : "In"}
      </p>
      {!isSignedIn && (
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
