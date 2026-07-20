import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowLeft, Calendar } from "lucide-react"
import { defaultNews } from "@/lib/news-data"

export async function generateStaticParams() {
  return defaultNews.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = defaultNews.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} | Indosvetka News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  }
}

function renderParagraph(trimmed: string, i: number) {
  const isBullet =
    trimmed.startsWith("\u2022") ||
    trimmed.startsWith("\u2705") ||
    trimmed.startsWith("\ud83d\ude95") ||
    trimmed.startsWith("\ud83d\uddf3") ||
    trimmed.startsWith("\ud83c\udf7d") ||
    trimmed.startsWith("\ud83d\udcac")

  const isDiplomatic = trimmed.startsWith("\ud83c\uddee\ud83c\uddf3")

  if (isDiplomatic) {
    return (
      <p
        key={i}
        className="text-white/80 text-base sm:text-lg leading-relaxed mb-3 font-medium"
      >
        {trimmed}
      </p>
    )
  }

  if (isBullet) {
    return (
      <p
        key={i}
        className="text-white/70 text-base sm:text-lg leading-relaxed mb-3 pl-4"
      >
        {trimmed}
      </p>
    )
  }

  if (i === 0 && trimmed.endsWith(":") && trimmed.length < 60) {
    return (
      <p
        key={i}
        className="text-white/80 text-lg sm:text-xl font-semibold leading-relaxed mb-5"
      >
        {trimmed}
      </p>
    )
  }

  return (
    <p
      key={i}
      className="text-white/70 text-base sm:text-lg leading-relaxed mb-6"
    >
      {trimmed}
    </p>
  )
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = defaultNews.find((a) => a.slug === slug)
  if (!article) notFound()

  const paragraphs = article.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main className="min-h-screen pt-20 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/newspaper.webp"
          alt=""
          fill
          className="object-cover opacity-[0.45]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a0a]/70 via-transparent to-[#0c0a0a]/90" />
      </div>

      <article className="relative max-w-[1728px] mx-auto px-6 py-16 sm:py-20">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-gold hover:text-gold/80 text-sm font-medium transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to News
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-[#0f0d0a]/50 backdrop-blur-sm border border-white/[0.04] rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />

            <span className="text-3xl sm:text-4xl block mb-5" role="img" aria-hidden="true">
              {article.emoji}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-white/40 text-sm mb-10 pb-10 border-b border-crimson/10">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{article.author}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              {paragraphs.map((p, i) => renderParagraph(p, i))}
            </div>

            <div className="mt-14 pt-8 border-t border-white/[0.04]">
              <p className="text-white/25 text-xs leading-relaxed">
                Sources: Embassy of Russia in India, Ministry of Foreign Affairs of the Russian Federation, Ministry of Economic Development of the Russian Federation, Embassy of India in Moscow, Ministry of External Affairs of India, TASS, The Times of India
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
