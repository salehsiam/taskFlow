import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { googleLogin, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data); // Check if the request is successful
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {});
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <h2 className="text-3xl font-semibold">welcome to taskFlow</h2>
        <button
          onClick={handleGoogleLogin}
          className="bg-white px-4 py-2 btn rounded-3xl border"
        >
          <p className="flex items-center gap-2 ">
            {" "}
            <FcGoogle className="text-xl" /> Continue With Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
