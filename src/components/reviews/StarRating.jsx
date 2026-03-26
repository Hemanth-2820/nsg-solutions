import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <motion.button
            key={index}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating && setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none transition-colors duration-200 p-1"
          >
            <Star
              className={`w-8 h-8 ${index <= (hover || rating)
                ? 'fill-[#38BDF8] text-[#38BDF8]'
                : 'text-white/20'
                }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;
