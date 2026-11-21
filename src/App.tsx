import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router"

const A = `${import.meta.env.BASE_URL}assets`

interface CategoryIconState {
  default: string
  hover: string
}

interface AnimatedValueProps {
  value: number
  active: boolean
}

const navigation = [
  {
    label: "전체제품",
    href: "#products",
    children: ["베스트 제품", "신제품", "스킨케어", "메이크업"],
  },
  {
    label: "신제품/캠페인",
    href: "#stories",
    children: ["신제품", "진행중인 캠페인", "브랜드 영상"],
  },
  {
    label: "맞춤 추천",
    href: "#diagnosis",
    children: ["피부 맞춤 진단", "피부 고민별 추천", "루틴 추천"],
  },
  {
    label: "성분·연구",
    href: "#evidence",
    children: ["핵심 성분", "임상 근거", "연구 스토리"],
  },
  {
    label: "브랜드 스토리",
    href: "#stories",
    children: ["브랜드 철학", "40년 피부 과학", "캠페인"],
  },
  {
    label: "고객지원",
    href: "#support",
    children: ["매장 찾기", "자주 묻는 질문", "1:1 문의"],
  },
]

function menuPath(itemLabel: string, child?: string) {
  if (child === "메이크업") return "/sub01-04"
  if (child === "피부 맞춤 진단") return "/sub03-01"
  if (child === "핵심 성분") return "/sub04-01"
  const item = navigation.find((entry) => entry.label === itemLabel)
  return `/${item?.href ?? ""}`
}

const categories = [
  ["76446.svg", "수분/보습"],
  ["013b5.svg", "주름/탄력"],
  ["c1dd5.svg", "미백/잡티"],
  ["d7eb2.svg", "진정/민감"],
  ["da2fa.svg", "클렌징"],
  ["74c89.svg", "선케어"],
  ["62304.svg", "선물세트"],
]

const products = {
  BEST: [
    {
      image: "product-list-brightening-cream.png",
      category: "산심 스킨케어",
      name: "미백 설 크림 50ml",
      tags: "#손상장벽개선 #48시간보습",
    },
    {
      image: "product-list-fermented-cream.png",
      category: "효움 스킨케어",
      name: "효움 순 발효 크림 30ml",
      tags: "#피부결정돈 #진정케어",
    },
    {
      image: "product-list-cushion.png",
      category: "메이크업",
      name: "명휘 커버 쿠션",
      tags: "#화사한 피부 표현  #에센스가 피부 정돈",
    },
    {
      image: "product-list-vital-cream.png",
      category: "산심 스킨케어",
      name: "백년삼 스네일 크림 30ml",
      tags: "#주름 개선 #보습",
    },
  ],
  NEW: [
    {
      image: "product-list-black-cream.png",
      category: "산심 스킨케어",
      name: "산심 천가선 60ml",
      tags: "#산심 #천가선",
    },
    {
      image: "product-list-ampoule.png",
      category: "산심 스킨케어",
      name: "산심 천가선 진 앰플 18ml × 3ea",
      tags: "#산심 #앰플",
    },
    {
      image: "product-list-cushion.png",
      category: "메이크업",
      name: "산심 명휘 커버 쿠션 20g",
      tags: "#산심 #쿠션",
    },
    {
      image: "product-list-brightening-cream.png",
      category: "산심 스킨케어",
      name: "산심 미백 설 크림 50ml",
      tags: "#산심 #크림",
    },
  ],
}

const evidence = [
  {
    value: 98.4,
    suffix: "%",
    title: "24시간 피부 장벽 개선율",
    line1: "P&K 피부임상연구센타 테스트 완료",
    line2: "성인 여성 30명 대상 / 2주간 사용 후 평가",
    button: "시험 결과 원본 보기",
  },
  {
    value: 100,
    suffix: "%",
    title: "전성분 EWG 그린 등급",
    line1: "화해 기준 20가지 주의성분 무첨가",
    line2: "인공향료, 인공색소, 파라벤 6종 배제",
    button: "성분 사전 검색",
  },
  {
    value: null,
    suffix: "PATENTED",
    title: "독자 특허 피토바이옴™",
    line1: "국내 특허 출원 (제 10-2025-XXXXX)",
    line2: "자체 R&D 연구소 40년 발효 기술 집약",
    button: "연구 스토리 보기",
  },
]

function SearchIcon() {
  return <img src={`${A}/3fbe8.svg`} alt="" aria-hidden="true" />
}

export function Header() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)
  const { pathname } = useLocation()
  const activeSection =
    pathname === "/sub01-04"
      ? "전체제품"
      : pathname === "/sub03-01"
        ? "맞춤 추천"
        : pathname === "/sub04-01"
          ? "성분·연구"
          : null

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [drawerOpen])

  return (
    <>
      <header className="site-header">
        <div className="utility">
          <div className="header-inner utility-links">
            <Link to="/#support">매장찾기</Link>
            <Link to="/#support">고객센터</Link>
            <span>/</span>
            <button>회원가입</button>
          </div>
        </div>
        <div className="main-nav" onMouseLeave={() => setActiveMenu(null)}>
          <div className="header-inner nav-row">
            <Link className="logo" to="/" aria-label="한국화장품 메인으로 이동">
              한국화장품
            </Link>
            <nav className="desktop-nav" aria-label="주 메뉴">
              {navigation.map((item, index) => (
                <div
                  className={`nav-item ${
                    activeSection === item.label ? "active" : ""
                  }`}
                  key={item.label}
                  onMouseEnter={() => setActiveMenu(index)}
                  onFocus={() => setActiveMenu(index)}
                >
                  <Link to={menuPath(item.label)}>{item.label}</Link>
                  <div
                    className={`submenu ${activeMenu === index ? "open" : ""}`}
                  >
                    <div className="submenu-inner">
                      <strong>{item.label}</strong>
                      {item.children.map((child) => (
                        <Link to={menuPath(item.label, child)} key={child}>
                          {child}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
            <label className="header-search">
              <span className="sr-only">통합 검색</span>
              <input placeholder="검색어를 입력하세요" />
              <SearchIcon />
            </label>
            <div className="mobile-actions">
              <button aria-label="검색">
                <SearchIcon />
              </button>
              <button
                aria-label="전체 메뉴 열기"
                onClick={() => setDrawerOpen(true)}
              >
                <img src={`${A}/532f3.svg`} alt="" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`drawer-backdrop ${drawerOpen ? "show" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className={`mobile-drawer ${drawerOpen ? "open" : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-top">
          <button
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
          <label className="drawer-search">
            <input placeholder="검색어를 입력하세요" aria-label="통합 검색" />
            <SearchIcon />
          </label>
        </div>
        <nav aria-label="모바일 메뉴">
          {navigation.map((item, index) => (
            <div className="mobile-menu-item" key={item.label}>
              <button
                aria-expanded={mobileOpen === index}
                onClick={() =>
                  setMobileOpen(mobileOpen === index ? null : index)
                }
              >
                <span>{item.label}</span>
                <span>{mobileOpen === index ? "−" : "+"}</span>
              </button>
              <div
                className={`mobile-submenu ${
                  mobileOpen === index ? "open" : ""
                }`}
              >
                {item.children.map((child) => (
                  <Link
                    to={menuPath(item.label, child)}
                    key={child}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {child}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

function Hero() {
  const [slide, setSlide] = useState(0)
  const [playing, setPlaying] = useState(true)
  const desktop = ["e442a.png", "f04c0.png", "5c408.png"]
  const mobile = ["f4643.png", "42520.png", "e580b.png"]

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setSlide((s) => (s + 1) % 3), 5000)
    return () => window.clearInterval(timer)
  }, [playing])

  return (
    <section className="hero" aria-label="주요 캠페인">
      <div
        className="hero-track"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {desktop.map((image, index) => (
          <picture className="hero-slide" key={image}>
            <source
              media="(max-width: 767px)"
              srcSet={`${A}/${mobile[index]}`}
            />
            <img
              src={`${A}/${image}`}
              alt={`한국화장품 스킨케어 캠페인 ${index + 1}`}
            />
          </picture>
        ))}
      </div>
      <div className="hero-controls">
        {desktop.map((_, index) => (
          <button
            className={slide === index ? "active" : ""}
            onClick={() => setSlide(index)}
            key={index}
          >
            <span className="sr-only">{index + 1}번 배너 보기</span>
          </button>
        ))}
        <button
          className="play-toggle"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
        >
          {playing ? (
            <span className="pause-icon" />
          ) : (
            <span className="play-icon" />
          )}
        </button>
      </div>
    </section>
  )
}

function CategoryNav() {
  const iconStates: Record<string, CategoryIconState> = {
    "수분/보습": { default: "380f3.svg", hover: "116ce.svg" },
    "주름/탄력": { default: "7b74c.svg", hover: "38d47.svg" },
    "미백/잡티": { default: "59643.svg", hover: "7f1de.svg" },
    "진정/민감": { default: "41cc8.svg", hover: "d9ae8.svg" },
    클렌징: { default: "0c785.svg", hover: "43985.svg" },
    선물세트: { default: "2f8c1.svg", hover: "355cb.svg" },
  }

  return (
    <nav className="category-wrap" aria-label="피부 고민별 제품">
      <div
        className="category-scroll"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return
          const scroller = event.currentTarget
          scroller.dataset.dragging = "true"
          scroller.dataset.dragged = "false"
          scroller.dataset.dragStartX = String(event.clientX)
          scroller.dataset.dragScrollLeft = String(scroller.scrollLeft)
          scroller.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          const scroller = event.currentTarget
          if (scroller.dataset.dragging !== "true") return
          const distance = Number(scroller.dataset.dragStartX) - event.clientX
          if (Math.abs(distance) > 4) scroller.dataset.dragged = "true"
          scroller.scrollLeft =
            Number(scroller.dataset.dragScrollLeft) + distance
        }}
        onPointerUp={(event) => {
          const scroller = event.currentTarget
          scroller.dataset.dragging = "false"
          if (scroller.hasPointerCapture(event.pointerId)) {
            scroller.releasePointerCapture(event.pointerId)
          }
        }}
        onPointerCancel={(event) => {
          event.currentTarget.dataset.dragging = "false"
        }}
        onClickCapture={(event) => {
          const scroller = event.currentTarget
          if (scroller.dataset.dragged === "true") {
            event.preventDefault()
            event.stopPropagation()
            scroller.dataset.dragged = "false"
          }
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        {categories.map(([, label]) => {
          const isSunCare = label === "선케어"
          const states = iconStates[label]

          return (
            <a href="#products" className="category" key={label}>
              <span className="category-icon" aria-hidden="true">
                <span className="category-icon-state category-icon-default">
                  <img
                    className="category-icon-bg"
                    src={`${A}/${isSunCare ? "263b0.svg" : "74c89.svg"}`}
                    alt=""
                  />
                  {!isSunCare && (
                    <img
                      className="category-icon-symbol"
                      src={`${A}/${states.default}`}
                      alt=""
                    />
                  )}
                </span>
                <span className="category-icon-state category-icon-hover">
                  <img
                    className="category-icon-bg"
                    src={`${A}/${isSunCare ? "a010e.svg" : "b0ffd.svg"}`}
                    alt=""
                  />
                  {!isSunCare && (
                    <img
                      className="category-icon-symbol"
                      src={`${A}/${states.hover}`}
                      alt=""
                    />
                  )}
                </span>
              </span>
              <span>{label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

function Products() {
  const [tab, setTab] = useState<"BEST" | "NEW">("BEST")
  const visibleProducts = products[tab]

  return (
    <section className="section products-section" id="products">
      <div className="container">
        <h2>지금 가장 사랑받는 제품</h2>
        <div className="product-tabs" role="tablist">
          {(["BEST", "NEW"] as const).map((name) => (
            <button
              role="tab"
              aria-selected={tab === name}
              className={tab === name ? "active" : ""}
              onClick={() => setTab(name)}
              key={name}
            >
              {name}
            </button>
          ))}
        </div>
        <div
          className="product-grid"
          role="tabpanel"
          aria-label={`${tab} 제품`}
        >
          {visibleProducts.map((product, index) => (
            <Link
              to="/sub01-04"
              className="product-card"
              key={`${tab}-${product.name}-${index}`}
            >
              <div className="product-image">
                <img
                  src={`${A}/${product.image}`}
                  alt={`${product.name} 제품`}
                />
              </div>
              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <span>{product.tags}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Diagnosis() {
  const [selected, setSelected] = useState<string[]>(["민감 및 트러블"])
  const concerns = ["건조 및 당김", "민감 및 트러블", "탄력 저하", "칙칙한 톤"]
  const toggle = (value: string) =>
    setSelected((current) =>
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    )

  return (
    <section className="diagnosis-section" id="diagnosis">
      <div className="container diagnosis-card">
        <div className="diagnosis-copy">
          <p className="eyebrow">30초 피부 타입 진단</p>
          <h2>내 피부에 꼭 맞는 맞춤 처방을 받아보세요</h2>
          <p className="description">
            간단한 3가지 질문을 통해 피부 고민을 분석하고 최적의 성분을 추천해
            드립니다.
          </p>
          <fieldset>
            <legend>Q1. 현재 가장 고민되는 피부 상태는 무엇인가요?</legend>
            <div className="concern-grid">
              {concerns.map((concern) => (
                <button
                  type="button"
                  aria-pressed={selected.includes(concern)}
                  className={selected.includes(concern) ? "selected" : ""}
                  onClick={() => toggle(concern)}
                  key={concern}
                >
                  {concern}
                </button>
              ))}
            </div>
          </fieldset>
          <Link className="primary-button" to="/sub03-01">
            맞춤 진단 시작하기 <img src={`${A}/78a5b.svg`} alt="" />
          </Link>
        </div>
        <img
          className="diagnosis-image"
          src={`${A}/3d6a6.png`}
          alt="스킨케어를 하는 여성"
        />
      </div>
    </section>
  )
}

function AnimatedValue({ value, active }: AnimatedValueProps) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) return
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 500, 1)
      setDisplay(value * progress)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])
  return <>{value % 1 ? display.toFixed(1) : Math.round(display)}</>
}

function Evidence() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section className="section evidence-section" id="evidence" ref={ref}>
      <div className="container">
        <h2>수치로 증명하는 한국화장품의 기술력</h2>
        <div className="evidence-grid">
          {evidence.map((item) => (
            <article className="evidence-card" key={item.title}>
              <div className="gold-line" />
              <strong>
                {item.value === null ? (
                  item.suffix
                ) : (
                  <>
                    <AnimatedValue value={item.value} active={visible} />
                    {item.suffix}
                  </>
                )}
              </strong>
              <h3>{item.title}</h3>
              <p>{item.line1}</p>
              <span>{item.line2}</span>
              <small>기획안 기준 · 실제 근거 확인 후 게시</small>
              {item.button === "성분 사전 검색" ? (
                <Link className="evidence-action" to="/sub04-01">
                  {item.button}
                </Link>
              ) : (
                <button>{item.button}</button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stories() {
  return (
    <section className="section stories-section" id="stories">
      <div className="container">
        <h2>스토리 &amp; 캠페인 콘텐츠</h2>
        <div className="stories-grid">
          <a href="#stories" className="featured-story">
            <img src={`${A}/746c3.png`} alt="한국화장품 피부 과학 연구원" />
            <div>
              <h3>40년 전통의 피부 과학, 바르게 만들다</h3>
              <p>한국화장품이 걸어온 기술 중심 스킨케어의 역사</p>
              <span>브랜드 스토리 전체보기 →</span>
            </div>
          </a>
          <a href="#stories" className="content-card">
            <div className="content-image">
              <img src={`${A}/03d85.png`} alt="세럼 마사지 방법" />
              <span className="video-play">▶</span>
            </div>
            <h3>[HOW-TO] 세럼 효과 높이는 마사지법</h3>
            <p>조회수 1.2만회 · 뷰티 팁</p>
          </a>
          <a href="#stories" className="content-card">
            <div className="content-image">
              <img src={`${A}/22861.png`} alt="피부 장벽 리셋 캠페인 제품" />
            </div>
            <h3>[캠페인] 환절기 피부 장벽 리셋 챌린지</h3>
            <p>진행기간: ~2026.11.30</p>
          </a>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  [
    "Q. 민감성 피부도 사용할 수 있나요?",
    "피부가 쉽게 붉어지거나 가려움, 화끈거림 반응이 생길 때는 내 피부에 맞는 처방을 받아 보세요.",
  ],
  [
    "Q. 샘플 신청 및 배송 안내",
    "샘플 신청과 배송 관련 문의는 고객상담실 또는 1:1 문의를 이용해 주세요.",
  ],
]

function Support() {
  const [opened, setOpened] = useState<number | null>(null)
  const [query, setQuery] = useState("")
  const [searched, setSearched] = useState(false)
  return (
    <section className="section support-section" id="support">
      <div className="container">
        <h2>매장 찾기 &amp; 고객지원</h2>
        <div className="support-grid">
          <article className="support-card">
            <h3>가까운 오프라인 매장 찾기</h3>
            <p>전국 백화점 및 공식 매장에서 직접 제품을 체험해 보세요.</p>
            <form
              className="store-search"
              onSubmit={(e) => {
                e.preventDefault()
                setSearched(true)
              }}
            >
              <label>
                <span className="sr-only">지역명 또는 매장명</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="지역명 또는 매장명 입력"
                />
                <SearchIcon />
              </label>
              <button>검색</button>
            </form>
            <div className="store-result">
              <img src={`${A}/63bc8.svg`} alt="" />
              <div>
                <strong>
                  {searched && query
                    ? `${query} 인근 매장`
                    : "플래그십 스토어 명동점"}
                </strong>
                <p>서울특별시 중구 명동길 XX | 02-123-4567</p>
                <span>영업시간: 10:30 ~ 22:00 (연중무휴)</span>
              </div>
            </div>
          </article>
          <article className="support-card faq-card">
            <h3>고객지원 &amp; FAQ</h3>
            <p>자주 묻는 질문을 빠르게 확인해 보세요.</p>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div
                  className={`faq ${opened === index ? "open" : ""}`}
                  key={question}
                >
                  <button
                    aria-expanded={opened === index}
                    onClick={() => setOpened(opened === index ? null : index)}
                  >
                    <span>{question}</span>
                    <span>⌄</span>
                  </button>
                  <div className="faq-answer">
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact">
              <strong>고객상담실: 080-123-4567</strong>
              <span>운영시간: 평일 09:00 ~ 18:00 (토/일/공휴일 휴무)</span>
            </div>
            <button className="outline-button">1:1문의하기</button>
          </article>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <nav>
            <a href="#top">
              <strong>개인정보처리방침</strong>
            </a>
            <a href="#top">이용약관</a>
            <a href="#top">상품권 안내</a>
            <a href="#top">기업소개</a>
            <a href="#top">인재채용</a>
          </nav>
          <div className="social">
            <img src={`${A}/b4ad3.svg`} alt="인스타그램" />
            <img src={`${A}/25a17.svg`} alt="유튜브" />
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <h2>한국화장품</h2>
            <p>
              한국화장품 (주) | 대표이사: OOO | 사업자등록번호: 000-00-00000
            </p>
            <p>
              주소: 서울특별시 종로구 청계천로 XX | 통신판매업신고:
              2026-서울종로-XXXX
            </p>
            <p>개인정보보호책임자: OOO | 이메일: cs@ihkcos.co.kr</p>
            <small>
              COPYRIGHT © HANKOOK COSMETICS CO., LTD. ALL RIGHTS RESERVED.
            </small>
          </div>
          <div className="wa-box">
            웹접근성 품질인증 마크<span>WA 인증 획득 예정</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <CategoryNav />
        <Products />
        <Diagnosis />
        <Evidence />
        <Stories />
        <Support />
      </main>
      <Footer />
    </div>
  )
}
