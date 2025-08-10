import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, ChevronLeft, ChevronRight, History } from 'lucide-react';

const experiences = [
  {
    title: "Estagiário / Aprendiz",
    company: "À definir",
    period: "2024 – Presente",
    description:
      "Buscando a primeira experiência profissional em desenvolvimento de software, focado em aprendizado contínuo e contribuição em projetos reais.",
    achievements: [
      "Participação em projetos de desenvolvimento frontend e backend",
      "Aprimoramento contínuo em linguagens como Java, Python e JavaScript",
      "Conhecimentos básicos em segurança da informação e automação"
    ],
    technologies: ["Java", "Python", "JavaScript", "API REST", "Frontend", "Backend"]
  },
  {
    title: "Desenvolvedor API REST",
    company: "Projeto Digital Innovation One",
    period: "2023",
    description:
      "Desenvolvimento de uma API RESTful em Java como parte de um desafio da Digital Innovation One, demonstrando habilidades em backend e manipulação de dados.",
    achievements: [
      "Criação e implementação de endpoints REST",
      "Manipulação de dados com Java",
      "Testes e documentação da API"
    ],
    technologies: ["Java", "API REST", "Backend"]
  },
  {
    title: "Desenvolvedor Frontend - Calculadora de IMC",
    company: "Projeto pessoal",
    period: "2023",
    description:
      "Projeto interativo para calcular o Índice de Massa Corporal (IMC), com manipulação do DOM e lógica em JavaScript.",
    achievements: [
      "Implementação da lógica de cálculo em JavaScript",
      "Desenvolvimento de interface responsiva usando HTML e CSS",
      "Melhoria da experiência do usuário"
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Frontend"]
  },
  {
    title: "Desenvolvedor Frontend - Tela de Login Responsiva",
    company: "Projeto pessoal",
    period: "2023",
    description:
      "Interface de login moderna e responsiva, focada em design e usabilidade.",
    achievements: [
      "Desenvolvimento do layout em HTML e CSS",
      "Foco em responsividade e acessibilidade",
      "Design simples e eficaz"
    ],
    technologies: ["HTML", "CSS", "Frontend"]
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
    <section id="experience" className="py-20 bg-[rgba(var(--bg-rgb),0.2)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-12 flex items-center gap-2 sm:gap-4">
          <History className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">cat ~/exp.log</span>
        </h2>

        <div className="w-full">
          <div className="relative min-h-[400px] sm:h-[400px] overflow-hidden rounded-xl">
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
                <div
                  className={`h-full bg-[rgba(var(--bg-rgb),0.4)] rounded-xl p-4 sm:p-6 md:p-8 border ${
                    currentIndex === 0
                      ? 'border-yellow-500 shadow-lg shadow-yellow-500/50'
                      : 'border-green-500/20'
                  } backdrop-blur-sm overflow-y-auto`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                        <span>{experiences[currentIndex].period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                        <span>{experiences[currentIndex].company}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-[rgb(var(--text-rgb))] leading-tight">
                      {experiences[currentIndex].title}
                    </h3>

                    <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      {experiences[currentIndex].description}
                    </p>

                    <div className="space-y-2 mb-4 sm:mb-6 hidden sm:block">
                      {experiences[currentIndex].achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                        >
                          <span className="text-green-500">→</span>
                          {achievement}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {experiences[currentIndex].technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-green-500/10 text-green-400"
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

          {/* Controles de navegação */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 px-2 sm:px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-1.5 sm:p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
              aria-label="Experiência anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
            </motion.button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? index === 0
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      : 'bg-green-500/20'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-1.5 sm:p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
              aria-label="Próxima experiência"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
