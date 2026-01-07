import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-foreground text-background border-t border-foreground/10">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <h3 className="font-serif text-2xl font-bold text-background">
                New Jersey
              </h3>
              <p className="text-sm text-background/60 mt-2">
                {t.footer.tagline}
              </p>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              {t.footer.description}
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-serif text-lg font-semibold text-background mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {[
                { name: t.nav.about, href: "#about" },
                { name: t.nav.services, href: "#services" },
                { name: t.nav.gallery, href: "#gallery" },
                { name: t.nav.hours, href: "#hours" },
                { name: t.nav.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-serif text-lg font-semibold text-background mb-4">
              {t.contact.label}
            </h4>
            <ul className="space-y-3">
              <li className="text-sm">
                <a
                  href="tel:+41244412119"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  +41 24 441 2119
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="mailto:marcienne.bess@vonet.ch"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  marcienne.bess@vonet.ch
                </a>
              </li>
              <li className="text-sm text-background/70">
                Route de Croy 9<br />
                1353 Bofflens, Switzerland
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>
              &copy; {currentYear} New Jersey. {t.footer.copyright}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/marcienne.besson"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/new_jersey_bofflens"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
