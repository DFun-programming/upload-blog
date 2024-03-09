import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { categories } from "../../assets/data/categories";


const Footer = () => {
  return (
    <section className="bg-gradient-to-tr from-blue-300/50 via-white to-green-300/35 mt-4">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
      
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-slate-800 font-bold md:text-lg">Explore</h3>
          <ul className="text-slate-600 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/search">Blog</a>
            </li>
            <li>
              <a href="/search">Categories</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-slate-800 font-bold md:text-lg">Popular Tags</h3>
          <ul className="text-slate-600 text-sm mt-5 space-y-4 md:text-base">
           {
            categories.slice(2,8).map((category)=>(
              <li key={category.id}><a href={`/search?category=${category.title.toLowerCase()}`}>{category.title}</a></li>

            ))
           }
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-start-auto lg:col-span-2">
        <h3 className="text-slate-800 font-bold md:text-lg">Legal</h3>
          <ul className="text-slate-600 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Terms of Service</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
        <h3 className="text-slate-800 font-bold md:text-lg">Connect</h3>
          <ul className="text-slate-600 text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base lg:text-sm">
            Stay up-to-date with our latest blog posts and news.
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <AiOutlineTwitter className="w-6 h-auto text-cyan-700" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className="w-6 h-auto text-red-600" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className="w-6 h-auto text-rose-500" />
              </a>
            </li>
            <li>
              <a href="/">
                <FaFacebook className="w-6 h-auto text-blue-500" />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTelegram className="w-6 h-auto text-violet-500" />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
          <div className="bg-primary text-white p-3 rounded-full">
            <AiFillHeart className="w-7 h-auto" />
          </div>
          <p className="font-bold italic text-dark-light">
            © {new Date().getFullYear()} <span className="font-extrabold bg-gradient-to-b from-indigo-800 via-purple-700 to-rose-700 text-transparent bg-clip-text"> DOT </span>Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
