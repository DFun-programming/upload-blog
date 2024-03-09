import './IconBtn.css'
export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center justify-center ${
          outline ? "border border-gradient-green-to-blue bg-transparent hover:bg-gradient-to-r from-green-400 to-blue-400" : "bg-gradient-to-r from-green-400 to-blue-400 hover:bg-gradient-to-l"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-blue-700"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }
  