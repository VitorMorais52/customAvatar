import "./Custom.css";
import Body from "../body";
import One from "../parts/hair/one";
import Two from "../parts/hair/two";
import Three from "../parts/hair/three";
import Four from "../parts/hair/four";
import Five from "../parts/hair/five";

function Custom() {
  return (
    <div className="container">
      <Body hairType={"five"} eyebrowAndNoseType={"two"} mouthType={"one"} />
      <h2>Editar</h2>
      <div className="bar">
        <div>Cabelo</div>
        <div>Boca</div>
        <div>Sobrancelhas/Nariz</div>
      </div>
      <div className="options">
        <div>
          <svg height="34.3" width="51.64">
            <One translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="31.97" width="56.26">
            <Two translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="28.24" width="47.2">
            <Three translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="37.06" width="55.07">
            <Four translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="42.93" width="58.8">
            <Five translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="34.3" width="51.64">
            <One translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="31.97" width="56.26">
            <Two translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
        <div>
          <svg height="31.97" width="56.26">
            <Two translateValues={{ x: "0", y: "0" }} />
          </svg>
        </div>
      </div>
      {/* cabeça */}
      {/* cabelo */}
      {/* boca */}
      {/* sobrancelha/nariz */}
      {/* cores p cada item */}
    </div>
  );
}

export default Custom;
