import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hours = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Schedule: Monday to Sunday
  // Monday: 13:30-16:30; Tuesday: 13:30-16:30; Wednesday: 13:30-16:30; Friday: 13:30-16:30
  // Thursday and Saturday and Sunday are closed
  const schedule = [
    { hours: "13:30 - 16:30" }, // Monday
    { hours: "13:30 - 16:30" }, // Tuesday
    { hours: "13:30 - 16:30" }, // Wednesday
    { hours: t.hours.closed }, // Thursday
    { hours: "13:30 - 16:30" }, // Friday
    { hours: t.hours.closed }, // Saturday
    { hours: t.hours.closed }, // Sunday
  ];

  // Get today's index (0 = Sunday, 1 = Monday, etc.)
  // But our schedule starts with Monday, so we need to adjust
  const getTodayIndex = () => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to index 6
  };

  const todayIndex = getTodayIndex();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="hours"
      ref={ref}
      className="py-24 bg-card"
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
            {t.hours.label}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mt-4">
            {t.hours.title}
          </h2>
        </motion.div>

        {/* Hours Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-background shadow-soft overflow-hidden"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-6 py-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg text-foreground">
              {t.hours.header}
            </span>
          </div>

          {/* Schedule List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="divide-y divide-border"
          >
            {schedule.map((item, i) => {
              const isToday = i === todayIndex;
              const isClosed = item.hours === t.hours.closed;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`px-6 py-4 flex justify-between items-center transition-colors ${
                    isToday ? "bg-primary/5" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                    <span
                      className={`font-medium ${
                        isToday ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {t.hours.days[i]}
                    </span>
                    {isToday && (
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {t.hours.today}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isClosed ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {item.hours}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;
