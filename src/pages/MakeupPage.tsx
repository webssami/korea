import { useMemo, useState } from "react"
import { Link } from "react-router"
import { Footer, Header } from "../App"

const A = `${import.meta.env.BASE_URL}assets`

const makeupProducts = [
  { image: "a6140.png", type: "베이스", name: "명휘 베이스 1호" },
  {
    image: "345b7.png",
    type: "베이스",
    name: "효움 순 발효 비비크림",
    best: true,
  },
  { image: "e9302.png", type: "아이", name: "오션 HD 붓펜 아이라이너" },
  { image: "3cb6e.png", type: "아이", name: "오션 HD 클리어 아이브로우" },
  { image: "78baa.png", type: "쿠션", name: "명휘 글로우 쿠션 1호/2호" },
  { image: "7ae88.png", type: "립", name: "명휘 립스틱" },
  { image: "22aa4.png", type: "립", name: "명휘 립세럼 스틱" },
  { image: "c988b.png", type: "베이스", name: "로제 드 톤 베이스" },
  { image: "de5dd.png", type: "아이", name: "오션 HD 퍼펙트 마스카라" },
  { image: "952f4.png", type: "쿠션", name: "명휘 커버 쿠션 1호/2호" },
  { image: "818a6.png", type: "파우더", name: "명휘 트윈케익 1호/2호" },
  { image: "3a872.png", type: "파운데이션", name: "명휘 파운데이션" },
]

const filterTypes = [
  "전체",
  "베이스",
  "쿠션",
  "파운데이션",
  "파우더",
  "립",
  "아이",
]

export default function MakeupPage() {
  const [filter, setFilter] = useState("전체")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("추천순")
  const [tone, setTone] = useState("뉴트럴")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const result = makeupProducts.filter(
      (product) =>
        (filter === "전체" ||
          product.type === filter ||
          (filter === "파우더" && product.type === "파우더")) &&
        product.name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    return sort === "이름순"
      ? [...result].sort((a, b) => a.name.localeCompare(b.name, "ko"))
      : result
  }, [filter, query, sort])

  const toggleFavorite = (name: string) =>
    setFavorites((current) => {
      const next = new Set(current)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  return (
    <div id="top">
      <Header />
      <main className="subpage makeup-page">
        <section className="sub-hero makeup-hero">
          <img src={`${A}/82e0a.png`} alt="한국화장품 2026 메이크업 컬렉션" />
          <div className="sub-hero-copy">
            <span>2026 MAKE-UP COLLECTION</span>
            <h1>
              피부 위에 피어나는,{" "}
              <span className="makeup-hero-title-break">나만의 컬러</span>
            </h1>
            <p>
              베이스부터 립까지, 명휘 · 오션 · 효움{" "}
              <span className="makeup-hero-collection">메이크업 컬렉션</span>
            </p>
            <a href="#makeup-list">컬렉션 보기 →</a>
          </div>
        </section>

        <section className="catalog-section sub-container" id="makeup-list">
          <div className="breadcrumb">
            <Link to="/">홈</Link>
            <span>›</span>
            <span>전체제품</span>
            <span>›</span>
            <strong>메이크업</strong>
          </div>
          <div className="catalog-heading">
            <h2>제품 유형별</h2>
            <span>
              총 <strong>{filtered.length}</strong>개 상품
            </span>
          </div>
          <div className="catalog-controls">
            <div className="filter-chips" aria-label="제품 유형 필터">
              {filterTypes.map((type) => (
                <button
                  className={filter === type ? "selected" : ""}
                  onClick={() => setFilter(type)}
                  key={type}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="catalog-search">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="제품명 검색"
                aria-label="제품명 검색"
              />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="제품 정렬"
              >
                <option>추천순</option>
                <option>이름순</option>
              </select>
            </div>
          </div>

          <div className="catalog-grid">
            {filtered.map((product) => (
              <article className="catalog-card" key={product.name}>
                <Link
                  to={`/sub01-04?product=${encodeURIComponent(product.name)}`}
                >
                  <div className="catalog-image">
                    <img src={`${A}/${product.image}`} alt={product.name} />
                    {product.best && <b>BEST</b>}
                  </div>
                  <span>{product.type}</span>
                  <h3>{product.name}</h3>
                </Link>
                <button
                  className={
                    favorites.has(product.name) ? "favorite active" : "favorite"
                  }
                  onClick={() => toggleFavorite(product.name)}
                  aria-label={`${product.name} 찜하기`}
                >
                  ♡
                </button>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="empty-result">검색 조건에 맞는 제품이 없습니다.</p>
          )}
        </section>

        <section className="makeup-mood">
          <img
            className="mood-surface"
            src={`${A}/04a09.svg`}
            alt=""
            aria-hidden="true"
          />
          <div className="sub-container">
            <header className="mood-heading">
              <span>BRAND MOOD</span>
              <h2>한국화장품 메이크업 무드</h2>
              <p>신선하고 감각적인 오늘의 컬러를 만나보세요</p>
            </header>
            <div className="mood-grid">
              <article className="mood-card">
                <img
                  className="mood-card-shape"
                  src={`${A}/419b0.svg`}
                  alt=""
                />
                <img
                  className="mood-card-decoration mood-card-decoration-peach"
                  src={`${A}/9051c.svg`}
                  alt=""
                />
                <div className="mood-product">
                  <img
                    className="mood-product-frame"
                    src={`${A}/c12ff.svg`}
                    alt=""
                  />
                  <img
                    className="mood-product-image"
                    src={`${A}/0a741.png`}
                    alt=""
                  />
                </div>
                <div className="mood-card-copy">
                  <strong>PEACH GLOW</strong>
                  <span>생기 있는 코랄 립</span>
                </div>
              </article>
              <article className="mood-card">
                <img
                  className="mood-card-shape"
                  src={`${A}/42715.svg`}
                  alt=""
                />
                <img
                  className="mood-card-decoration mood-card-decoration-rose"
                  src={`${A}/b68be.svg`}
                  alt=""
                />
                <div className="mood-product">
                  <img
                    className="mood-product-frame"
                    src={`${A}/c12ff.svg`}
                    alt=""
                  />
                  <img
                    className="mood-product-image"
                    src={`${A}/3bf45.png`}
                    alt=""
                  />
                </div>
                <div className="mood-card-copy">
                  <strong>ROSE PETAL</strong>
                  <span>맑은 로즈 컬러 팩트</span>
                </div>
              </article>
              <article className="mood-card">
                <img
                  className="mood-card-shape"
                  src={`${A}/87ed6.svg`}
                  alt=""
                />
                <img
                  className="mood-card-decoration mood-card-decoration-sand"
                  src={`${A}/0fa9b.svg`}
                  alt=""
                />
                <div className="mood-product">
                  <img
                    className="mood-product-frame"
                    src={`${A}/c12ff.svg`}
                    alt=""
                  />
                  <img
                    className="mood-product-image"
                    src={`${A}/1c57e.png`}
                    alt=""
                  />
                </div>
                <div className="mood-card-copy">
                  <strong>SAND NUDE</strong>
                  <span>차분한 샌드 누드 베이스</span>
                </div>
              </article>
              <aside className="mood-guide">
                <img
                  className="mood-guide-shape"
                  src={`${A}/4c3a0.svg`}
                  alt=""
                />
                <div className="mood-guide-copy">
                  <strong>SKIN FIRST,</strong>
                  <strong>COLOR NEXT.</strong>
                  <p>
                    피부 결을 먼저 다듬고,
                    <br />
                    컬러는 가볍게.
                  </p>
                  <Link to="/sub03-01">메이크업 가이드 보기 →</Link>
                </div>
                <img
                  className="mood-guide-ring ring-large"
                  src={`${A}/6ac85.svg`}
                  alt=""
                />
                <img
                  className="mood-guide-ring ring-small"
                  src={`${A}/c6ae6.svg`}
                  alt=""
                />
                <img className="mood-guide-dot" src={`${A}/d7683.svg`} alt="" />
              </aside>
            </div>

            <div className="tone-zone">
              <div className="tone-panel">
                <img
                  className="tone-panel-shape"
                  src={`${A}/96ecb.svg`}
                  alt=""
                />
                <div className="tone-copy">
                  <strong>내 피부 톤 찾기</strong>
                  <span>쿠션 · 파운데이션 호수 가이드</span>
                </div>
                <div className="tone-swatches" aria-label="피부 톤 호수 선택">
                  {[
                    ["13호", "6e237.svg"],
                    ["17호", "221fe.svg"],
                    ["21호", "87288.svg"],
                    ["23호", "6eac6.svg"],
                    ["25호", "249fb.svg"],
                    ["27호", "8662f.svg"],
                  ].map(([label, image]) => {
                    const selected =
                      tone === label || (tone === "뉴트럴" && label === "21호")
                    return (
                      <button
                        className={selected ? "selected" : ""}
                        onClick={() => setTone(label)}
                        aria-pressed={selected}
                        key={label}
                      >
                        {selected && (
                          <img
                            className="tone-ring"
                            src={`${A}/c7e44.svg`}
                            alt=""
                          />
                        )}
                        <img
                          className="tone-color"
                          src={`${A}/${image}`}
                          alt=""
                        />
                        <span>{label}</span>
                      </button>
                    )
                  })}
                </div>
                <button
                  className="tone-check"
                  onClick={() => setTone(tone === "뉴트럴" ? "21호" : tone)}
                >
                  내 호수 확인하기 →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
