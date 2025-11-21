import React from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaUsers,
  FaRegBookmark,
  FaGlobeAsia,
  FaHeart,
} from "react-icons/fa";
import bg from "../assets/bg.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const AboutUs = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white py-16 md:py-24">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />

      {/* Content wrapper */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:px-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* LEFT: Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.2em] text-orange-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FaUtensils />
            who we are
          </motion.p>

          <motion.h1
            className="text-3xl md:text-5xl font-extrabold leading-tight"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Bringing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              home cooks
            </span>{" "}
            & recipes together in one cozy place.
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-slate-200/90 leading-relaxed"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Recipe Book is your digital kitchen companion — a space where you
            can discover global flavors, save family classics, and share your
            own creations with a like-minded community of food lovers.
          </motion.p>

          {/* Feature bullets */}
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            {[
              {
                icon: <FaRegBookmark />,
                title: "Save & organize",
                text: "Bookmark recipes you love and keep them neatly organized.",
              },
              {
                icon: <FaUsers />,
                title: "Community driven",
                text: "Learn from real home cooks instead of just static recipes.",
              },
              {
                icon: <FaGlobeAsia />,
                title: "World cuisines",
                text: "From comfort food to fine dining, find it all in one place.",
              },
              {
                icon: <FaHeart />,
                title: "Cook with love",
                text: "Turn everyday meals into memories worth sharing.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3 border border-white/10 hover:bg-white/10 transition"
              >
                <span className="mt-1 text-orange-300 text-xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-200/80">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image + Stats card */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-md">
            {/* Floating card */}
            <motion.div
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-md"
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="h-56 md:h-64 w-full overflow-hidden">
                <motion.img
                  src={bg}
                  alt="Colorful food ingredients"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>

              <div className="p-5 md:p-6 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-orange-200">
                  A kitchen for everyone
                </h3>
                <p className="text-sm md:text-base text-slate-100/90 leading-relaxed">
                  No matter your skill level, Recipe Book makes it easy to find,
                  tweak, and treasure recipes that match your lifestyle — from
                  quick weekday dinners to slow, cozy weekend cooking.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="rounded-2xl bg-black/20 px-3 py-2 text-center">
                    <p className="text-lg md:text-2xl font-bold text-orange-300">
                      2k+
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-200/80">
                      Recipes shared
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/20 px-3 py-2 text-center">
                    <p className="text-lg md:text-2xl font-bold text-lime-300">
                      900+
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-200/80">
                      Home cooks
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/20 px-3 py-2 text-center">
                    <p className="text-lg md:text-2xl font-bold text-sky-300">
                      30+
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-200/80">
                      Countries
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glow behind the card */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-orange-500/20 blur-3xl" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
