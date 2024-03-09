import React from "react";
import { FiSearch } from "react-icons/fi";
import HeroImage from '../../../assets/HeroImage.svg'
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";


const Hero = () => {
  const navigate = useNavigate();
  const onPopularClick = (searchQuery) => {
   
    navigate(`/search?category=${searchQuery}`);
  };
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row ">
      <div className="mt-10 lg:w-1/2 flex flex-col gap-y-2.5 lg:mt-16">
        <h1 className="font-roboto text-3xl text-center font-bold text-slate-900 md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles
        </h1>
        <p className="text-slate-900 mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left font-serif font-normal">
        Explore the cutting-edge realm of technology with us. Dive deep into innovation, discover new horizons, 
        and join our dynamic community of tech enthusiasts. Let's unlock the future together.
        <span className="text-center md:text-xl lg:text-[16px]  lg:text-left font-edu-sa font-semibold italic text-blue-600 " >  From AI to blockchain, cybersecurity to quantum computing, 
              our blog is your compass in navigating the tech landscape of tomorrow</span>
        </p>
     
        <div className="flex gap-x-2.5 items-center w-full sm:justify-center lg:justify-normal mt-4 lg:mt-6">
        <button className={'w-fit px-4 py-2 rounded-lg border-offset-2 border border-gradient-green-to-blue bg-transparent hover:bg-gradient-to-r from-green-400 to-blue-400'}  onClick={()=>navigate('/signup')} > Sign Up </button>
        <button className="bg-green-900 hover:bg-transparent outline outline-blue-900 w-fit px-4 py-2 rounded-lg text-white hover:text-black" onClick={()=>navigate('about')}>About</button>
      </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7 sm:items-center sm:justify-center lg:justify-normal">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold" >
              <button onClick={()=>onPopularClick('javascript')}>Javascript</button>
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold" >
              <button onClick={()=>onPopularClick('user experience')}>User Experience</button>
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold" >
              <button onClick={()=>onPopularClick('nextjs')}>NextJS</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img
          className="w-full"
          src={HeroImage}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;
