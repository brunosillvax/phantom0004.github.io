import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: "Senior Cybersecurity Analyst",
    company: "SecureNet Solutions",
    period: "2023 - Present",
    description: "Led threat hunting operations and implemented advanced security monitoring solutions.",
    achievements: [
      "Reduced security incidents by 40% through proactive threat detection",
      "Implemented zero-trust architecture across cloud infrastructure",
      "Developed automated incident response playbooks"
    ],
    technologies: ["SIEM", "Threat Intelligence", "Incident Response"]
  },
  {
    title: "Security Engineer",
    company: "CyberGuard Technologies",
    period: "2021 - 2023",
    description: "Specialized in penetration testing and vulnerability assessments for enterprise clients.",
    achievements: [
      "Conducted 50+ successful penetration tests",
      "Discovered critical zero-day vulnerability",
      "Developed custom security tools for internal use"
    ],
    technologies: ["Penetration Testing", "Vulnerability Assessment", "Tool Development"]
  },
  {
    title: "Junior Security Analyst",
    company: "DefendCorp",
    period: "2019 - 2021",
    description: "Monitored security incidents and performed malware analysis.",
    achievements: [
      "Handled 200+ security incidents",
      "Implemented automated malware analysis pipeline",
      "Created security awareness training program"
    ],
    technologies: ["Malware Analysis", "Security Monitoring", "Incident Handling"]
  }
];

export function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = experiences.length - 1;
      if (nextIndex >= experiences.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-20 bg-black/20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Briefcase className="w-8 h-8 text-green-500" />
          <span>cat ~/experience.log</span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[500px] sm:h-[400px] overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div className="h-full bg-black/40 rounded-xl p-6 border border-green-500/20 backdrop-blur-sm">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{experiences[currentIndex].period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Building2 className="w-4 h-4" />
                        <span>{experiences[currentIndex].company}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {experiences[currentIndex].title}
                    </h3>

                    <p className="text-gray-400 mb-6">
                      {experiences[currentIndex].description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {experiences[currentIndex].achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <span className="text-green-500">→</span>
                          {achievement}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {experiences[currentIndex].technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-green-500' : 'bg-green-500/20'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}