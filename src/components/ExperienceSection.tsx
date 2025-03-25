import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, ExternalLink } from 'lucide-react';

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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-green-500/20 transform -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-0 md:left-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="absolute w-6 h-6 bg-green-500/20 rounded-full animate-ping" />
              </div>

              {/* Content */}
              <div className={`bg-black/40 rounded-xl p-6 border border-green-500/20 backdrop-blur-sm transition-all duration-300 hover:border-green-500/40 ${
                index % 2 === 0 ? 'md:text-right md:mr-8' : 'md:ml-8'
              }`}>
                <div className="flex items-center gap-2 mb-2 text-green-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-1 text-white">{exp.title}</h3>
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Building2 className="w-4 h-4" />
                  <span>{exp.company}</span>
                </div>

                <p className="text-gray-400 mb-4">{exp.description}</p>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <span className="text-green-500">→</span>
                      {achievement}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Empty div for layout */}
              <div />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}