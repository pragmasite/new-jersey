import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
  const { t, otherLangs, lang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.hours, href: "#hours" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href={lang === "fr" ? "/" : `/${lang}`} className="flex flex-col">
          <span
            className={`font-serif text-xl font-bold ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            New Jersey
          </span>
          <span
            className={`text-xs tracking-widest ${
              isScrolled ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            {t.nav.profession}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher - Desktop */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-current border-opacity-20">
            {otherLangs.map((lang) => (
              <Link
                key={lang.lang}
                to={lang.path}
                className={`text-sm transition-colors flex items-center gap-1 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Globe className="h-4 w-4" />
                {lang.lang.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Call Button - Desktop */}
          <Button asChild className="ml-2">
            <a href="tel:+41244412119">
              <Phone className="h-4 w-4 mr-2" />
              {t.nav.call}
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          {mobileMenuOpen ? (
            <X
              className={`h-6 w-6 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm px-4 py-2 rounded-lg hover:bg-primary/10 text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <div className="my-2 border-t border-border pt-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Languages
                </span>
              </div>
              {otherLangs.map((lang) => (
                <Link
                  key={lang.lang}
                  to={lang.path}
                  className="text-sm px-4 py-2 rounded-lg hover:bg-primary/10 text-foreground transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {lang.lang.toUpperCase()}
                </Link>
              ))}
            </div>

            <Button asChild className="w-full mt-2">
              <a href="tel:+41244412119">
                <Phone className="h-4 w-4 mr-2" />
                {t.nav.call}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
