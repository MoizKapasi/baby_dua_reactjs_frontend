import React, { useState } from "react";
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
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BabyAnnouncement() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/new`, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center p-2 md:p-4 lg:p-6 overflow-y-auto"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), 
          url(${backgroundImage})
        `,
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-3 sm:p-5 md:p-8 rounded-3xl shadow-xl animate-fade-in-up relative my-4 sm:my-6"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.5)), 
            url(${cardBackgroundImage})
          `,
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxHeight: "95vh",
          boxShadow: "0 0 20px 5px rgba(168, 130, 255, 0.5)", // Pink shadow
        }}
      >
        <div className="overflow-y-auto max-h-full no-scrollbar">
          <div className="relative text-center">
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-2 pt-2 sm:mb-4">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400 animate-bounce" />
              <Baby className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400 animate-bounce" />
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-500 animate-bounce" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-400 mb-2 sm:mb-3 drop-shadow-xl">
              Mubarak, it's a Baby Girl!
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-bold text-purple-600 drop-shadow-sm">
              "الحمد لله شكرًا لله"
            </p>
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-spin" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-spin" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-spin" />
            </div>
          </div>

          <div className="mt-3 sm:mt-4 text-center px-2 sm:px-4">
            <p
              className="text-xs sm:text-sm md:text-base font-semibold leading-relaxed text-purple-400 shadow-md shadow-pink-200 p-2 sm:p-3 rounded-lg bg-white/80 backdrop-blur-md"
              style={{
                border: "1px solid rgba(236, 72, 153, 0.3)",
                boxShadow: "0px 4px 12px rgba(236, 72, 153, 0.3)",
              }}
            >
              As we welcome the little bundle of joy into our home, we would
              like you to join in our happiness by guessing the name of our
              little princess. 💕 Please fill out the form below to share your
              joy and wishes with us!
            </p>
          </div>

          <div className="mt-3 sm:mt-4 pb-3 sm:pb-4 px-2 sm:px-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              <div className="relative">
                <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <input
                  id="your_name"
                  {...register("your_name", {
                    required: "Please fill your name",
                  })}
                  placeholder="Who's sharing this beautiful moment? 💕"
                  className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-xs sm:text-sm border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400/500 focus:border-transparent bg-white text-gray-800"
                  disabled={isSubmitting}
                />
                {errors.your_name && (
                  <p className="text-red-500 text-xs sm:text-sm font-semibold mt-1">
                    {errors.your_name.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Baby className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                <input
                  id="baby_name"
                  {...register("baby_name", {
                    required: "Please fill baby's name",
                    validate: (value) => {
                      // Split the input by comma and trim whitespaces
                      const names = value.split(",").map((name) => name.trim());

                      // Check if there's only one name and no spaces within the name
                      return (
                        (names.length === 1 && names[0].indexOf(" ") === -1) ||
                        "Please enter only one name"
                      );
                    },
                  })}
                  placeholder="What's your guess for the baby's name? 👶"
                  className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-xs sm:text-sm border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-800"
                  disabled={isSubmitting}
                />
                {errors.baby_name && (
                  <p className="text-red-500 font-semibold text-xs sm:text-sm mt-1">
                    {errors.baby_name.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-2 sm:left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <textarea
                  id="dua"
                  {...register("dua")}
                  placeholder="A heartfelt prayer or wish for the baby? 🤲"
                  className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-xs sm:text-sm border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-16 sm:h-20 md:h-24 bg-white text-gray-800"
                  disabled={isSubmitting}
                />
                {errors.dua && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.dua.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 md:py-3 text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-pink-300 rounded-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400/500 transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <span className="truncate">Submit</span>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
