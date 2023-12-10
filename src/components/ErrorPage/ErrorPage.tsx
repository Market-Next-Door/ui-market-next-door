import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ErrorPage.css";

type ErrorPageProps = {
  error: string;
  message: string;
};

function ErrorPage({ error, message }: ErrorPageProps) {
  const location = useLocation();
  const { someProp } = location.state || {};
  console.log("SOME PROP", someProp);
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }

  return (
    <div className="error-container">
      <h1 className="error-header" cy-test="error-message">
        Am I at the right market? I think I'm lost...
      </h1>
      <h1 className="error-header" cy-test="error-message">
        {error}
      </h1>
      <h1 className="error-header" cy-test="error-message">
        {message}
      </h1>
      <h1 className="error-mnd">Market Next Door</h1>
      <div>
        <div className="error-btns">
          <button
            id="error-login"
            className="error-btn"
            onClick={navigateToHome}
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
