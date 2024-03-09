import React from 'react'

import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Instructor.png";

import CTAButton from '../../common/CTAButton';
import HighlightText from '../../common/HighlightText';

const AuthorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center mt-5 mb-6">
          <div className="lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Become an
              <HighlightText text={"Author"} />
            </h1>

            <p className="font-semibold text-lg text-justify w-[90%] text-slate-700">
              Authors from around the world share their knowledge with millions of students on 
             <span className=' bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-transparent bg-clip-text font-extrabold'> Dot</span> Blog. We provide the knowledge to know about what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Posting Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AuthorSection