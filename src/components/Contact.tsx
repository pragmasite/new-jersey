import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.contact.label}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mt-4">
            {t.contact.title1}
            <br />
            <span className="text-primary">{t.contact.title2}</span>
          </h2>
          <p className="text-foreground/70 text-lg mt-6">
            {t.contact.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Phone */}
            <div className="rounded-lg bg-card border border-border p-6 hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    {t.contact.phone}
                  </h3>
                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                  >
                    <a href="tel:+41244412119">+41 24 441 2119</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-lg bg-card border border-border p-6 hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    {t.contact.email}
                  </h3>
                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                  >
                    <a href="mailto:marcienne.bess@vonet.ch">
                      marcienne.bess@vonet.ch
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-lg bg-card border border-border p-6 hover:shadow-soft transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-foreground">
                    {t.contact.address}
                  </h3>
                  <p className="text-foreground/70">
                    Route de Croy 9<br />
                    1353 Bofflens<br />
                    Switzerland
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button asChild size="lg" className="w-full">
              <a href="tel:+41244412119">
                <Phone className="mr-2 h-5 w-5" />
                {t.contact.callNow}
              </a>
            </Button>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg overflow-hidden border border-border shadow-soft h-96 lg:h-auto min-h-96"
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="New Jersey Location"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.7894531876197!2d6.497647!3d46.705225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f1e5e8f1e5e5d%3A0x5e5e5e5e5e5e5e5e!2sRoute%20de%20Croy%209%2C%201353%20Bofflens!5e0!3m2!1sen!2sch!4v1234567890`}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
