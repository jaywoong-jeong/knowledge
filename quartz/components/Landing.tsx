import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import landingStyle from "./styles/landing.scss"

interface LandingCard {
  title: string
  subtitle: string
  description: string
  href: string
}

const cards: LandingCard[] = [
  {
    title: "Thoughts",
    subtitle: "생각의 조각",
    description: "직관과 통찰을 다듬는 짧은 메모와 기록",
    href: "/thoughts",
  },
  {
    title: "Study",
    subtitle: "연구와 탐구",
    description: "배운 내용을 정리하고 재구성한 학습 로그",
    href: "/study",
  },
  {
    title: "Critique",
    subtitle: "관찰과 비평",
    description: "읽고 보고 느낀 것을 차분하게 해부한 기록",
    href: "/critique",
  },
]

export default (() => {
  const Landing = (_props: QuartzComponentProps) => {
    const currentYear = new Date().getFullYear()

    return (
      <main class="landing">
        <section class="landing__hero">
          <div class="landing__title-wrapper">
            <img src="/static/icon.svg" alt="Icon" class="landing__icon" />
            <h1>Jaywoong Jeong</h1>
          </div>
        </section>
        <section class="landing__grid">
          {cards.map((card) => (
            <a key={card.title} href={card.href} class="landing-card">
              <p class="landing-card__subtitle">{card.subtitle}</p>
              <h2>{card.title}</h2>
              <p class="landing-card__description">{card.description}</p>
            </a>
          ))}
        </section>

        <footer class="landing__footer">
          <div class="landing__divider" />
          <p class="landing__credit">
            Made by Jaywoong Jeong using{" "}
            <a href="https://github.com/jackyzha0/quartz" target="_blank" rel="noreferrer">
              Quartz
            </a>
            , © {currentYear}
          </p>
        </footer>
      </main>
    )
  }

  Landing.css = landingStyle
  return Landing
}) satisfies QuartzComponentConstructor

