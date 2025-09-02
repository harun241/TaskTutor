import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Correct module imports for Swiper v9+
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const feedbacks = [
  { name: "Alice", feedback: "This app improved my productivity a lot!" },
  { name: "Bob", feedback: "Budget tracker is super helpful." },
  { name: "Charlie", feedback: "Love the Pomodoro timer feature!" },
  { name: "Diana", feedback: "Exam Q&A generator saved me tons of time." },
  { name: "Ethan", feedback: "Study planner is very organized and easy to use." },
  { name: "Fiona", feedback: "Class schedule tracker is a lifesaver." },
  { name: "George", feedback: "Clean UI and very responsive app." },
  { name: "Hannah", feedback: "I can finally manage my tasks easily." },
  { name: "Ian", feedback: "Pomodoro sessions really keep me focused." },
  { name: "Julia", feedback: "Highly recommend to all students!" },
];

export default function FeedbackSection() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Users Feedback</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {feedbacks.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-gray-700 italic mb-4">"{item.feedback}"</p>
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
