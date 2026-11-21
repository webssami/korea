import { useMemo, useState } from "react"
import { Footer, Header } from "../App"

const A = `${import.meta.env.BASE_URL}assets`

type SkinProduct = {
  image: string
  line: string
  name: string
  description: string
  types: string[]
  concerns: string[]
}

const skinProducts: SkinProduct[] = [
  {
    image: "d4835.png",
    line: "산심",
    name: "미백 설 크림 50ml",
    description: "맑고 탄탄한 피부를 위한 영양 크림",
    types: ["건성", "민감성"],
    concerns: ["칙칙한 톤", "탄력 저하"],
  },
  {
    image: "2802d.png",
    line: "효움",
    name: "효움 순 발효 크림 30ml",
    description: "발효 보습으로 편안한 피부결",
    types: ["건성", "복합성"],
    concerns: ["건조 및 당김", "민감 및 트러블"],
  },
  {
    image: "00236.png",
    line: "산심",
    name: "백년삼 스네일 크림",
    description: "탄력과 보습을 한 번에",
    types: ["건성", "중성"],
    concerns: ["탄력 저하"],
  },
  {
    image: "952f5.png",
    line: "명휘",
    name: "명윤수 앰플",
    description: "화사하고 매끈한 피부 표현",
    types: ["지성", "복합성"],
    concerns: ["칙칙한 톤"],
  },
  {
    image: "d4855.png",
    line: "산심",
    name: "천가선 진 에센스",
    description: "깊은 영양과 윤기 케어",
    types: ["건성", "중성"],
    concerns: ["탄력 저하", "칙칙한 톤"],
  },
  {
    image: "2058d.png",
    line: "효움",
    name: "효움 수분 앰플",
    description: "피부 속부터 채우는 수분",
    types: ["지성", "복합성"],
    concerns: ["건조 및 당김"],
  },
  {
    image: "00259.png",
    line: "산심",
    name: "자양로 진 에센스",
    description: "예민한 피부를 위한 진정",
    types: ["민감성"],
    concerns: ["민감 및 트러블"],
  },
  {
    image: "930b9.png",
    line: "산심",
    name: "자양상 크림",
    description: "오래 지속되는 밀착 베이스",
    types: ["중성", "복합성"],
    concerns: ["칙칙한 톤"],
  },
]

const skinTypes = ["건성", "지성", "중성", "복합성", "민감성"]
const concernOptions = [
  "민감 및 트러블",
  "건조 및 당김",
  "탄력 저하",
  "칙칙한 톤",
]

const lineStories = [
  {
    number: "01",
    name: "산심",
    englishName: "SANSIM",
    image: "d4835.png",
    description: "깊이 있는 한방 에이징케어",
  },
  {
    number: "02",
    name: "효움",
    englishName: "HYOUM",
    image: "product-new-fermented-cream.png",
    description: "발효 원료로 가꾸는 맑은 피부결",
  },
  {
    number: "03",
    name: "명휘",
    englishName: "MYUNGHWI",
    image: "product-list-cushion.png",
    description: "빛나는 완성의 메이크업 라인",
  },
]

function toggleValue(
  value: string,
  values: string[],
  setValues: (next: string[]) => void,
) {
  setValues(
    values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value],
  )
}

export default function DiagnosisPage() {
  const [lineOpen, setLineOpen] = useState(true)
  const [lines, setLines] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [types, setTypes] = useState<string[]>([])
  const [concerns, setConcerns] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filtered = useMemo(
    () =>
      skinProducts.filter(
        (product) =>
          (lines.length === 0 || lines.includes(product.line)) &&
          product.name.toLowerCase().includes(query.trim().toLowerCase()) &&
          (types.length === 0 ||
            types.some((type) => product.types.includes(type))) &&
          (concerns.length === 0 ||
            concerns.some((concern) => product.concerns.includes(concern))),
      ),
    [lines, query, types, concerns],
  )

  const reset = () => {
    setLines([])
    setQuery("")
    setTypes([])
    setConcerns([])
    setSelectedProducts([])
  }

  const toggleProduct = (name: string) =>
    setSelectedProducts((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    )

  return (
    <div id="top">
      <Header />
      <main className="subpage diagnosis-page">
        <section className="sub-hero diagnosis-hero">
          <img
            src={`${A}/8d331.png`}
            alt="시간을 넘어 세대를 잇는 한국화장품 피부 연구"
          />
          
        </section>

        <section className="diagnosis-workspace sub-container">
          <div className="diagnosis-title">
            <div>
              <h2>내 피부에 꼭 맞는 맞춤 처방을 받아보세요</h2>
              <p>
                피부 타입과 고민을 선택하면{" "}
                <span className="diagnosis-title-recommendation">
                  현재 피부에 알맞은 제품을 추천해 드립니다.
                </span>
              </p>
            </div>
          </div>

          <div className="diagnosis-layout">
            <div className="diagnosis-results">
              <div className="recommend-line">
                <strong>추천 제품 {filtered.length}개</strong>
                <span>{selectedProducts.length}개 선택됨</span>
              </div>
              <div className="skin-product-grid">
                {filtered.map((product) => (
                  <article
                    className={
                      selectedProducts.includes(product.name)
                        ? "skin-product selected"
                        : "skin-product"
                    }
                    key={product.name}
                  >
                    <button
                      className="select-product"
                      onClick={() => toggleProduct(product.name)}
                      aria-pressed={selectedProducts.includes(product.name)}
                    >
                      <img src={`${A}/${product.image}`} alt={product.name} />
                      <span>{product.line} 스킨케어</span>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <b>
                        {selectedProducts.includes(product.name)
                          ? "선택됨"
                          : "제품 선택"}
                      </b>
                    </button>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="empty-result">
                  선택한 조건에 맞는 제품이 없습니다.
                </p>
              )}
            </div>

            <aside className="diagnosis-panel">
              <button
                className="diagnosis-reset-button"
                type="button"
                onClick={reset}
              >
                선택 옵션 초기화
              </button>
              <div className="line-accordion">
                <button
                  onClick={() => setLineOpen(!lineOpen)}
                  aria-expanded={lineOpen}
                >
                  <span>제품 라인 선택</span>
                  <span>{lineOpen ? "−" : "+"}</span>
                </button>
                {lineOpen && (
                  <div>
                    {["산심", "효움", "명휘"].map((line) => (
                      <label key={line}>
                        <input
                          type="checkbox"
                          checked={lines.includes(line)}
                          onChange={() => toggleValue(line, lines, setLines)}
                        />
                        {line} 스킨케어
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <label className="diagnosis-search">
                <span>제품명 입력</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="제품명을 입력하세요"
                />
              </label>
              <div className="skin-type-filter">
                <span>주름이 걱정되는 겨울, 내 피부 타입은?</span>
                <div>
                  {skinTypes.map((type) => (
                    <button
                      className={types.includes(type) ? "selected" : ""}
                      aria-pressed={types.includes(type)}
                      onClick={() => toggleValue(type, types, setTypes)}
                      key={type}
                    >
                      # {type}
                    </button>
                  ))}
                </div>
              </div>
              <img
                className="today-skin"
                src={`${A}/3d6a6.png`}
                alt="오늘의 피부 맞춤 처방"
              />
              <fieldset>
                <legend>Q1. 현재 가장 고민되는 피부 상태는 무엇인가요?</legend>
                <div className="concern-buttons">
                  {concernOptions.map((concern) => (
                    <button
                      type="button"
                      className={concerns.includes(concern) ? "selected" : ""}
                      aria-pressed={concerns.includes(concern)}
                      onClick={() =>
                        toggleValue(concern, concerns, setConcerns)
                      }
                      key={concern}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="consult-box">
                <span>피부 상담이 필요하신가요?</span>
                <strong>고객상담실 080-123-4567</strong>
                <small>평일 09:00 ~ 18:00 (토/일/공휴일 휴무)</small>
              </div>
            </aside>
          </div>
        </section>

        
        <section className="diagnosis-bottom">
          <div className="diagnosis-bottom-inner">
            <div className="diagnosis-bottom-copy">
              <span>BRAND HERITAGE</span>
              <h2>
                피부의 시간을
                <br />
                아름답게 잇다
              </h2>
              <p>
                산심, 효움, 명휘 — 세 가지 라인에 담은
                <br />
                한국화장품의 오랜 연구와 원료 철학.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector(".diagnosis-workspace")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                라인별 스토리 보기 →
              </button>
            </div>
            <div className="diagnosis-line-stories">
              {lineStories.map((line) => (
                <article className="diagnosis-line-card" key={line.number}>
                  <div className="diagnosis-line-orbit" aria-hidden="true">
                    <span>{line.number}</span>
                  </div>
                  <div className="diagnosis-line-product">
                    <img src={`${A}/${line.image}`} alt="" />
                  </div>
                  <div className="diagnosis-line-copy">
                    <h3>{line.name}</h3>
                    <span>{line.englishName}</span>
                    <p>{line.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
