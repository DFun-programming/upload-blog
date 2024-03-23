import React from "react";
import FoundingStory from "../assets/FoundingStory.png";
const About = () => {
  return (
    <section>
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-slate-700">
        <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
          <div className="my-24 flex lg:w-[50%] flex-col gap-10">
            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-bold text-transparent lg:w-[70%] ">
              Who Are We?
            </h1>
            <p className="text-lg font-medium text-richblack-300 lg:w-[95%]">
              Welcome to Blog Space, where technology meets innovation and
              inspiration. We are a passionate team dedicated to unraveling the
              complexities of the digital world and bringing you the latest
              insights, trends, and breakthroughs. Whether you're a seasoned
              tech aficionado or a curious newcomer, join us as we explore the
              endless possibilities of the digital realm. Let's embark on a
              journey of discovery together, shaping the future one pixel at a
              time.
            </p>
            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              At Blog Space, drawing from our own experiences as educators, we've
              seen the constraints and hurdles of traditional education
              firsthand. We've long held the conviction that learning should
              transcend classroom walls and geographical barriers. With this
              vision in mind, we've built a platform to bridge these gaps,
              empowering individuals of every background to unleash their innate
              potential. Join us on this journey of boundless learning and
              personal growth, where the only limit is your imagination
            </p>
          </div>

          <div>
            <img
              src={FoundingStory}
              alt="founder"
              className="shadow-[0_0_20px_0] shadow-[#9cc8fa]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
          <div className="my-24 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
              Our Vision
            </h1>
            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="my-24 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#55c9de] to-[#32e07b] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
            </h1>
            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              At Blog Space, our mission transcends mere content delivery. We're
              dedicated to cultivating a thriving community of avid learners,
              fostering connections, collaboration, and continuous growth. We
              firmly believe that knowledge flourishes within a supportive
              ecosystem of sharing and dialogue. Through engaging forums, live
              discussions, and networking events, we empower individuals to
              learn, connect, and flourish together. Join us as we pave the path
              to collective enlightenment and personal enrichment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
