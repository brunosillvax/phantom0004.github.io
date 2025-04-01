import { motion } from 'framer-motion';
import { Send, Key, Copy, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const cooldownTimeRef = useRef<number>(0);
  const focusRef = useRef<HTMLDivElement>(null);
  const pgpContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimeRef.current) {
        clearTimeout(cooldownTimeRef.current);
      }
    };
  }, []);

  const handleCopyPGP = async () => {
    const pgpKey = document.querySelector('.pgp-container code')?.textContent;
    if (pgpKey) {
      try {
        await navigator.clipboard.writeText(pgpKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        // Scroll the PGP container into view if needed
        if (pgpContainerRef.current) {
          pgpContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 1000;

    const colors = ['#22c55e', '#10b981', '#059669'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cooldown) {
      return;
    }

    setIsSubmitting(true);
    setCooldown(true);

    // Start 10 second cooldown
    cooldownTimeRef.current = window.setTimeout(() => {
      setCooldown(false);
    }, 10000);

    // Simulate loading for 2 seconds before submitting
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      try {
        const response = await fetch('https://formspree.io/f/mqaplvwo', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          triggerConfetti();
          formRef.current.reset();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20">
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  disabled={isSubmitting || cooldown}
                  className="form-input w-full bg-black/30 border border-green-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50 disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting || cooldown}
                  className="form-input w-full bg-black/30 border border-green-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50 disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting || cooldown}
                  className="form-textarea w-full bg-black/30 border border-green-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50 h-32 resize-none disabled:opacity-50"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cooldown}
                className="cyber-button w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  '[$ sending...]'
                ) : cooldown ? (
                  '[$ please_wait...]'
                ) : (
                  '[$ send_message]'
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm space-y-4"
          >
            {/* Hidden element for focus */}
            <div 
              ref={focusRef} 
              tabIndex={0} 
              style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} 
            />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-green-500">
                <Key className="w-4 h-4" />
                <span>PGP Public Key</span>
              </div>
              <button 
                onClick={handleCopyPGP}
                className={`cyber-button !px-4 !py-2 flex items-center gap-2 text-sm ${copied ? 'text-green-400' : ''}`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>
            
            <div ref={pgpContainerRef} className="pgp-container relative rounded-lg bg-black/30 border border-green-500/20">
              <div className="max-h-[300px] overflow-y-auto overflow-x-auto custom-scrollbar cursor-pointer">
                <pre className="p-4 text-gray-400 relative group-hover:bg-black/40 transition-colors duration-300">
                  <code className="block whitespace-pre font-mono text-xs leading-relaxed">
                    {`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xm8EZ+O/yRMFK4EEACIDAwSZzHVo55XImzYyAJx7i4kHNXGwouQHpbSuWID9m5Qo
1Wu794lsdVOjPkw97TQR6myjJybHkvI/FifXDWVLtR+y9P9xEZbBcTLENu6HC10A
mWpfqgWpelN8HOAbzG5wY0DNTERhcnlsIEdhdHQgKFBvcnRmb2xpbyBDb21tdW5p
Y2F0aW9uIFBHUCBLZXkpIDxwaGFudG9tLnRlY2hzZWNAZGFyeWxnYXR0LmRldj7C
jwQTEwoAFwUCZ+O/yQIbLwMLCQcDFQoIAh4BAheAAAoJEBTOIqkqa6XjJlgBfjwX
C7Y818OJABf0F8JmgNX3A7FpbFkiZGNsvwG0pyrqdw0Bbo8h2l2Sj8FfbDA9GQGA
06HIDizhL2IUzl0f3cWNo9Mw5Rj4IThXP1DR6PGnsiQ8E1pUh2fG25SnoGCpVyO+
zlIEZ+O/yRMIKoZIzj0DAQcCAwTsZHnjZAg/M+o6NfSb9yPaKBAxtUbbC71EOYzj
dgyQsI+ZCW+90NJSXUX67CyysOIRoGUHi9FUyirOitqODiVGwsAnBBgTCgAPBQJn
47/JBQkPCZwAAhsuAGoJEBTOIqkqa6XjXyAEGRMKAAYFAmfjv8kACgkQepvM3biF
SaUHHwEAvbp9OUK6OQNPHUlH/U1vJHQ1/h/NhxICATvyh7JuN5IA/0WoBZBtkGbS
sLFibCyKjKNDUk4I5Va0KLi6C9hTre3RX4wBfi7CopW9JJi8yxmLL0yTWtY4efFm
prSsm0em2t5V6/b4MlNZyXe8XtABgSKATp4TSAGAxaXOtzEuXKZFFmwvYZhBUP+A
1b5UOSYQU6+MeePqbUrPWKggWPtkJLmsVTvbQmMHzlIEZ+O/yRMIKoZIzj0DAQcC
AwSc30NSiqGtYVRje8VU4ex+LMvGFnKML4IPvooO7rlP+jcznUvlAvdtQwiBxfgq
a2Pp+zLkCzKQA1t1hW7lkwZPwsAnB
=ihCx
-----END PGP PUBLIC KEY BLOCK-----`}
                  </code>
                </pre>
              </div>
              <div className="pgp-scan-animation">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-scan"></div>
              </div>
            </div>
            <p className="text-gray-400 mt-4">
              For secure communication, please encrypt your message using the above PGP key.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}