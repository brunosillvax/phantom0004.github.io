import { motion } from 'framer-motion';
import { Send, Key } from 'lucide-react';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactSection() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4"
      >
        <h2 className="section-header text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Send className="w-8 h-8 text-green-500" />
          <span>contact</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  {...register('name', { required: true })}
                  className="form-input w-full bg-black/30 border border-green-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">Name is required</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="form-input w-full bg-black/30 border border-green-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">Valid email is required</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: true })}
                  className="form-textarea w-full bg-black/30 border border-green-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50 h-32 resize-none"
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1 block">Message is required</span>
                )}
              </div>

              <button
                type="submit"
                className="cyber-button w-full justify-center"
              >
                [$ send_message]
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-green-500">
              <Key className="w-4 h-4" />
              <span>PGP Public Key</span>
            </div>
            <div className="pgp-container rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-green-500/5 to-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <pre className="bg-black/30 p-4 rounded-lg text-gray-400 relative group-hover:bg-black/40 transition-colors duration-300">
                <code className="block whitespace-pre font-mono text-xs leading-relaxed overflow-hidden">
                  {`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.4
Comment: https://openpgpjs.org

xsFNBGBI7U4BEAC8ZPj...
[Public key content truncated]
-----END PGP PUBLIC KEY BLOCK-----`}
                </code>
                <div className="pgp-scan-animation">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-scan"></div>
                </div>
              </pre>
            </div>
            <p className="text-gray-400">
              For secure communication, please encrypt your message using the above PGP key.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}