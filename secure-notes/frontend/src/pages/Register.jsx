import Form from "../components/Form";
import "../styles/Login.css";

function Register() {
  return (
    <div className="container">
      <Form route="/api/user/register" method="register" />;
    </div>
  );
}

export default Register;
