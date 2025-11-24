import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import landingStyle from "./styles/landing.scss"

interface LandingCard {
  tag: string
  title: string
  description: string
  href: string
  wide?: boolean
  arrowUp?: boolean
}

// SVG Icons
const Icons = {
  ArrowUpRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
}

const navLinks = [
  { href: "https://jaywoong.me", label: "About" },
  { href: "/index.xml", label: "RSS" },
  { href: "https://github.com/jaywoong-jeong", label: "Github" },
]

const cards: LandingCard[] = [
  {
    tag: "Note",
    title: "Thoughts",
    description: "직관과 통찰을 다듬는 짧은 메모와 기록. 순간의 영감을 놓치지 않고 포착합니다.",
    href: "/thoughts",
    wide: true,
    arrowUp: true,
  },
  {
    tag: "Archive",
    title: "Study",
    description: "배운 내용을 정리하고 재구성한 학습 로그.",
    href: "/study",
    arrowUp: false,
  },
  {
    tag: "Review",
    title: "Critique",
    description: "읽고 보고 느낀 것을 차분하게 해부한 기록.",
    href: "/critique",
    arrowUp: false,
  },
  {
    tag: "Research",
    title: "Papers & Docs",
    description: "깊이 있는 연구를 위해 읽고 정리한 논문과 테크니컬 문서들의 모음집.",
    href: "/papers",
    wide: true,
    arrowUp: true,
  },
]

export default (() => {
  const Landing = (props: QuartzComponentProps) => {
    const { allFiles } = props
    const currentYear = new Date().getFullYear()

    // Get latest updates
    const latestUpdates = allFiles
      .filter((file) => !file.slug?.endsWith("index") && file.dates?.modified && !file.frontmatter?.draft)
      .sort((a, b) => {
        const dateA = new Date(a.dates?.modified!)
        const dateB = new Date(b.dates?.modified!)
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, 3)

    const formatDate = (dateStr: string | Date) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }

    return (
      <main class="landing">
        <div class="landing__container">
            {/* Header Section */}
            <header class="landing__header">
                <div class="landing__logo">
                    <img src="/static/icon.svg" alt="Logo" class="landing__logo-icon" />
                    <h1>Jaywoong Jeong</h1>
                </div>
                <nav class="landing__nav">
                    {navLinks.map((link) => (
                      <a href={link.href} class="hover:underline" key={link.label}>
                        {link.label}
                      </a>
                    ))}
                </nav>
            </header>

            {/* Intro + Latest Updates */}
            <div class="landing__intro-grid">
                <section class="landing__bio">
                    <p>
                        I tend a <span class="highlight-box">digital garden</span>, recording what I learn. <br /> 
                        I write about intuition, insight, and technology.
                    </p>
                </section>

                <section class="landing__updates">
                    <div class="updates-label">Latest Updates</div>
                    <ul class="updates-list">
                        {latestUpdates.map(file => (
                            <li class="update-item">
                                <a href={`/${file.slug}`} class="update-title">{file.frontmatter?.title || file.slug}</a>
                                <span class="update-date">{file.dates?.modified ? formatDate(file.dates.modified) : ''}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Bento Grid Layout */}
            <section class="landing__grid">
                {cards.map((card) => (
                    <a href={card.href} class={`brutal-card group ${card.wide ? 'col-span-2' : ''} ${card.wide ? 'wide-card' : ''}`}>
                        <div class="card-content">
                            <div class="card-header">
                                <h2 class="card-title">{card.title}</h2>
                                {card.arrowUp ? 
                                    <div class="card-arrow"><Icons.ArrowUpRight /></div> : 
                                    <div class="card-arrow-right"><Icons.ArrowRight /></div>
                                }
                            </div>
                            <p class="card-desc">{card.description}</p>
                            <span class="card-tag">{card.tag}</span>
                        </div>
                    </a>
                ))}
            </section>

            <footer class="landing__footer">
                <nav class="footer-nav">
                  {navLinks.map((link) => (
                    <a href={link.href} key={link.label}>
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div class="footer-left">
                  <p class="footer-credit">
                    <span>© {currentYear} Jaywoong Jeong</span>
                    <span>
                      Built with{" "}
                      <a href="https://github.com/jackyzha0/quartz" target="_blank" rel="noreferrer">
                        Quartz
                      </a>
                      .
                    </span>
                  </p>
                  <div class="system-status">
                      <span class="status-dot"></span>
                      System Operational
                  </div>
                </div>
            </footer>
        </div>
      </main>
    )
  }

  Landing.css = landingStyle
  return Landing
}) satisfies QuartzComponentConstructor
