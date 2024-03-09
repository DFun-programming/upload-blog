import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from "../../common/IconBtn"
import { signUp } from "../../../services/operations/authOperations"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    username:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { username , firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = async(e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    console.log(formData)
 
      const resp =  dispatch(signUp(username , firstName, lastName, email, password, confirmPassword,navigate));
      console.log(resp)
    // Reset
    setFormData({
      username:"",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  }

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700">
              Username<sup className="text-rose-800">*</sup>
            </p>
            <input
              required
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              placeholder="Enter username"
              className="form-style w-full outline-none rounded-lg border-2 border-gradient-green-to-blue"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700">
              First Name <sup className="text-rose-800">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full outline-none rounded-lg border-2 border-gradient-green-to-blue"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700">
              Last Name <sup className="text-rose-800">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full outline-none rounded-lg border-2 border-gradient-green-to-blue"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700">
            Email Address <sup className="text-rose-800">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full outline-none rounded-lg border-2 border-gradient-green-to-blue"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700">
              Create Password <sup className="text-rose-800">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 outline-none rounded-lg border-2 border-gradient-green-to-blue"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700">
              Confirm Password <sup className="text-rose-800">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 outline-none rounded-lg border-2 border-gradient-green-to-blue" 

              />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer "
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <IconBtn
          type="submit"
          text={"Create Account"}
        />
        </form>
    </div>
  )
}

export default SignupForm
