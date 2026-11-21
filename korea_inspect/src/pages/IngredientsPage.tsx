import { Footer, Header } from "../App"

const A = `${import.meta.env.BASE_URL}assets`

const process = [
  {
    image: "c6ea9.png",
    title: "약화된 피부장벽",
    text: "피부 장벽이 약화되면 수분 손실과 외부 물질의 침투가 쉬워집니다.",
  },
  {
    image: "6e324.png",
    title: "MLE® 성분 전달",
    text: "피부지질유사성분 MLE®가 피부장벽을 튼튼하게 만들어줍니다.",
  },
  {
    image: "ac0af.png",
    title: "건강한 피부장벽",
    text: "피부가 적정량의 수분을 함유하고 외부 오염 물질을 막아줍니다.",
  },
]

export default function IngredientsPage() {
  return (
    <div id="top">
      <Header />
      <main className="subpage ingredients-page">
        <section className="sub-hero ingredients-hero">
          <img
            src={`${A}/dd515.png`}
            alt="수분 입자로 표현한 한국화장품 피부 연구"
          />
          
        </section>

        <section className="ingredient-intro sub-container">
          <h2>핵심 성분</h2>
          <span>SKIN SCIENCE · MLE® TECHNOLOGY</span>
          <h1>피부 지질 구조를 닮은 MLE®</h1>
          <strong>Multi Lamellar Emulsion</strong>
          <p>
            세라마이드-9S를 이용하여 건강한 피부에서 나타나는 다중층상구조를
            동일하게 재현한 제형으로 피부장벽 강화와 건조하고 민감한 피부 보호,
            보습 기능 강화에 도움을 줍니다.
          </p>
        </section>

        <section className="barrier-process sub-container">
          <h2>MLE® 작용 시스템</h2>
          <p>SKIN BARRIER CARE PROCESS</p>
          <div className="process-grid">
            {process.map((item) => (
              <article key={item.title}>
                <img src={`${A}/${item.image}`} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="microscope-section">
          <div className="sub-container">
            <h2>편광현미경과 몰타크로스 구조</h2>
            <p>
              피부의 지질을 물에 분산하여 관찰하면 십자형의 특이한 몰타크로스
              액정구조가 나타나며, MLE® 제형에서도 동일한 구조를 확인할 수
              있습니다.
            </p>
            <div className="microscope-grid">
              <article>
                <h3>전자현미경으로 확인한 구조</h3>
                <img
                  src={`${A}/13dad.png`}
                  alt="전자현미경으로 확인한 Skin Lamellar와 MLE Lamellar 구조"
                />
                <div>
                  <span>Skin Lamellar</span>
                  <span>MLE Lamellar®</span>
                </div>
              </article>
              <article>
                <h3>편광현미경으로 확인한 구조</h3>
                <img
                  src={`${A}/55806.png`}
                  alt="편광현미경으로 확인한 Skin Lipids와 Ceramide-9S 구조"
                />
                <div>
                  <span>Skin Lipids</span>
                  <span>Ceramide-9S</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mle-components sub-container">
          <h2>MLE® 구성 성분</h2>
          <div className="component-diagram">
            <img
              src={`${A}/mle-components.png`}
              alt="MLE 구성 성분: 세라마이드, 콜레스테롤, 유리지방산과 수분층"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
