"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Newspaper, Calendar, ArrowRight } from "lucide-react"
import { defaultNews } from "@/lib/news-data"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function NewsContent() {
  const articles = [...defaultNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden min-h-[520px] flex items-start">
        <div className="absolute inset-0">
          <Image
            src="/newspaper.png"
            alt="Newspaper and coffee travel journalism"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a0a] via-[#0c0a0a]/85 to-[#0c0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a0a] via-transparent to-[#0c0a0a]/60" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #d4af37 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative w-full max-w-[1728px] mx-auto px-6 pt-48 pb-8 sm:pt-56 sm:pb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-[0.15em] uppercase mb-4"
          >
            <Newspaper size={14} />
            Updates
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            News &{" "}
            <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
              Updates
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gold/70 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            Stay informed on Russia tourism, Indo-Russian diplomatic relations, and travel industry insights curated for Indian travelers.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1728px] mx-auto px-6 pb-20 pt-8 sm:pt-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {articles.map((article) => (
            <motion.div key={article.slug} variants={itemAnim}>
              <Link
                href={`/news/${article.slug}`}
                className="group block rounded-2xl border border-crimson/15 bg-[#1a0a0a] p-6 sm:p-8 hover:border-crimson/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(139,0,0,0.15)]"
              >
                <span className="text-2xl block mb-3" role="img" aria-hidden="true">
                  {article.emoji}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300 leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group/link">
                    Read More
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
