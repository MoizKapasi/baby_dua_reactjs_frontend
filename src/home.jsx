import React from "react";
import { useForm } from "react-hook-form";
import backgroundImage from "../src/assets/backgroundimage.jpg";
import cardBackgroundImage from "../src/assets/background2.jpeg";
import {
  Heart,
  Send,
  Star,
  User,
  Baby,
  MessageSquare,
  Gift,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BabyAnnouncement() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      navigate("/result");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center p-2 sm:p-6 md:p-8 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className="w-full max-w-md p-4 sm:p-8 md:p-10 rounded-3xl shadow-3xl animate-fade-in-up justify-between relative overflow-hidden"
        style={{
          backgroundImage: `url(${cardBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          maxHeight: "90vh",
          boxShadow: "0 0 20px 5px rgba(255, 105, 180, 0.5)", // Pink shadow
        }}
      >
        <div className="absolute inset-0 overflow-y-auto no-scrollbar p-1.5">
          <div className="relative mt-4 sm:mt-2 text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Gift className="w-6 sm:w-8 h-6 sm:h-8 text-pink-500 animate-bounce" />
              <Baby className="w-6 sm:w-8 h-6 sm:h-8 text-pink-500 animate-bounce" />
              <Crown className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500 animate-bounce" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-500 mb-4 drop-shadow-xl mt-2">
              Mubarak, it's a Baby Girl!
            </h2>
            <p className="text-lg sm:text-xl font-bold text-purple-600 drop-shadow-sm">
              "الحمد لله شكرًا لله"
            </p>
            <div className="flex justify-center space-x-2 mt-3 sm:mt-4">
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400 animate-spin" />
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400 animate-spin" />
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400 animate-spin" />
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center px-4">
            <p
              className="text-sm sm:text-base font-semibold leading-relaxed text-pink-500 shadow-md shadow-pink-200 px-4 py-3 rounded-lg bg-white/80 backdrop-blur-md"
              style={{
                border: "1px solid rgba(236, 72, 153, 0.3)",
                boxShadow: "0px 4px 12px rgba(236, 72, 153, 0.3)",
              }}
            >
              As we welcome the little bundle of joy into our home, we would
              love for you to join in our happiness by guessing the name of our
              little princess. 💕 Please fill out the form below to share your
              joy and wishes with us!
            </p>
          </div>

          <div className="mt-2 sm:mt-4 pb-4 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-6 transform -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 text-pink-500" />
                <input
                  id="your_name"
                  {...register("your_name", {
                    required: "This field is required",
                  })}
                  placeholder="Who's sharing this beautiful moment(your name)? 💕"
                  className="w-full px-10 py-3 text-sm sm:text-base border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-gray-800"
                />
                {errors.your_name && (
                  <p className="text-red-500 text-sm font-semibold mt-1">
                    {errors.your_name.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Baby className="absolute left-3 top-6 transform -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 text-purple-500" />
                <input
                  id="baby_name"
                  {...register("baby_name", {
                    required: "This field is required",
                  })}
                  placeholder="What's the precious little one's name? 👶"
                  className="w-full px-10 py-3 text-sm sm:text-base border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-800"
                />
                {errors.baby_name && (
                  <p className="text-red-500 font-semibold text-sm mt-1">
                    {errors.baby_name.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 sm:w-6 h-5 sm:h-6 text-green-500" />
                <textarea
                  id="dua"
                  {...register("dua")}
                  placeholder="A heartfelt prayer or wish for the newborn? 🤲"
                  className="w-full px-10 py-3 text-sm sm:text-base border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-24 sm:h-28 bg-white text-gray-800"
                />
                {errors.dua && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dua.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300 flex items-center justify-center"
              >
                <span className="truncate">Submit</span>
                <Send className="w-4 sm:w-6 h-4 sm:h-6 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
