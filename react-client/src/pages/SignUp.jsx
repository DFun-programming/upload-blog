import React from "react";
import Template from "../components/core/auth/Template";
import signupImg from "../assets/signup.webp";
const SignUp = () => {
  return (
    <Template
      title="Join the Community: Sign up for Exclusive contents for free"
      description1="Discover a wealth of curated content effortlessly with our revolutionary platform, reshaping how you explore and engage with information"
      description2="Dive into a world of curated insights "
      image={signupImg}
      formType="signup"
    />
  );
};

export default SignUp;
