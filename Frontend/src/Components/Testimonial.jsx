import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This platform helped me sell my old books quickly and safely. The process was smooth, payments were secure, and I connected with genuine buyers within a day. Highly recommended for students!"
  },
  {
    name: "Rahul Mehta",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I love reading blogs from other book lovers here. The content is insightful, relatable, and keeps me updated with trending reads and book reviews."
  },
  {
    name: "Anjali Verma",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Affordable books and a great community! I’ve saved so much money buying second-hand books, and the sellers are very responsive."
  },
  {
    name: "Arjun Patel",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Buying books from real users feels trustworthy. The rating system and user profiles make the experience transparent and reliable."
  },
  {
    name: "Neha Kapoor",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    text: "I’ve met amazing readers and writers here. It’s more than a marketplace — it feels like a real community."
  },
  {
    name: "Karan Singh",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    text: "The interface is clean and very easy to use. Posting a book for sale takes less than 2 minutes!"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 sm:mb-14">
          What Our Users Say ❤️
        </h2>

        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:-left-6 md:-left-12 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 sm:p-3 rounded-full hover:bg-gray-100 transition z-10"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${index * 100}%)`
              }}
            >
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className="
                    w-full 
                    sm:w-1/2 
                    lg:w-1/3 
                    flex-shrink-0 
                    px-3
                  "
                >
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md min-h-[280px] sm:min-h-[320px] flex flex-col justify-between hover:shadow-lg transition">

                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 object-cover border-2 border-indigo-100"
                      />

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        “{item.text}”
                      </p>
                    </div>

                    <h4 className="mt-4 sm:mt-6 font-semibold text-indigo-600 text-sm sm:text-base">
                      – {item.name}
                    </h4>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:-right-6 md:-right-12 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 sm:p-3 rounded-full hover:bg-gray-100 transition z-10"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>

        </div>
      </div>
    </section>
  );
}