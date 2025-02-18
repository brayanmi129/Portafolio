import Engranajeimg from "../../assets/engranaje.png";
import "./css/working.css";
function Working() {
  return (
    <div className="working">
      <div className="working-text">
        <h1>Working</h1>
        <p> We apreciate your pacient, we are working in this page</p>
      </div>
      <div className="working-img">
        <img src={Engranajeimg} alt="Img Engranaje" />
      </div>
    </div>
  );
}

export default Working;
