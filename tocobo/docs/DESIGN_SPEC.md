# DESIGN SPEC: TOCOBO × SIRIAI "IN MY SUN ERA" 크리에이터 모집 페이지

**문서 버전:** 1.0  
**작성일:** 2026-05-18

---

## 1. 브랜드 분석

### 1.1 TOCOBO 브랜드 아이덴티티

TOCOBO는 클린 K-뷰티의 미학을 따른다. 과한 장식 없이 제품 자체의 신뢰감을 전면에 세우는 방식. 글로벌 채널(tocobo.com, 공식 인스타)에서 일관되게 나타나는 특성:

- **여백 중심 레이아웃** — 요소 간 넉넉한 white space, 클러터 배제
- **모노크롬 + 포인트 레드** — 화이트 배경에 차콜 텍스트, 브랜드 레드(#dc272d)는 포인트로만
- **산세리프 타이포그래피** — 모던하고 깔끔한 서체, 과한 드라마틱 폰트 지양
- **실사 제품 이미지 중심** — 일러스트나 그래픽보다 실제 제품·라이프스타일 사진 우선
- **문장 구조** — 짧고 직접적. 과한 감탄사·이모지 없음

### 1.2 기존 SIRIAI 작업물과의 통합 원칙

| 구분 | oddtype-invite (moev) | influencer-5man (틈결) | 이번 TOCOBO |
|------|----------------------|----------------------|------------|
| 배경 | 검정 (#0a0a0a) | 크림 (#FFF8F5) | 화이트 (#ffffff) |
| 강조색 | 핫핑크 (#ff3366) | 피치 (#E8826A) | TOCOBO 레드 (#dc272d) |
| 폰트 | Pretendard | Noto Serif KR + Pretendard | Instrument Sans + Noto Sans KR |
| 무드 | 다크 글래머 | 따뜻한 감성 | 클린 모던 K-뷰티 |
| 코드 품질 | 비압축, 읽기 가능 | 비압축, 읽기 가능 | 동일 수준 유지 |

> TOCOBO 페이지는 다크 테마가 아닌 **라이트/화이트 베이스**. 브랜드 결정임.

---

## 2. 디자인 토큰 (CSS 변수)

```css
:root {
  /* === Brand Colors === */
  --red:        #dc272d;   /* TOCOBO 브랜드 레드 — CTA, 강조, 선택 상태 */
  --red-soft:   #f5e5e5;   /* 레드 tint — hover bg, 선택 카드 배경 */
  --red-dark:   #b81e23;   /* 레드 darken — CTA hover 상태 */

  /* === Neutral === */
  --white:      #ffffff;
  --bg:         #f7f7f7;   /* 섹션 구분용 엷은 회색 bg */
  --ink:        #231f20;   /* 주요 텍스트 — 브랜드 차콜 */
  --ink-mid:    #5c5759;   /* 보조 텍스트, 레이블 */
  --ink-light:  #9a9596;   /* placeholder, 비활성 텍스트 */
  --border:     #e0dede;   /* 기본 테두리 */
  --border-sel: #dc272d;   /* 선택 상태 테두리 */

  /* === Typography === */
  --font-display: 'Instrument Sans', 'Noto Sans KR', sans-serif;  /* 헤딩, 대형 텍스트 */
  --font-body:    'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif; /* 본문, 폼 */

  /* === Spacing === */
  --space-xs:   8px;
  --space-sm:   16px;
  --space-md:   24px;
  --space-lg:   40px;
  --space-xl:   64px;

  /* === Shape === */
  --radius-sm:  8px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-pill: 999px;

  /* === Motion === */
  --ease:       cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast:   160ms;
  --dur-med:    260ms;
}
```

---

## 3. 타이포그래피 스케일

| 역할 | 폰트 | 크기 | 웨이트 | 용도 |
|------|------|------|--------|------|
| Display | Instrument Sans | 40–52px | 700 | 히어로 타이틀 "IN MY SUN ERA" |
| Heading 1 | Instrument Sans | 24–32px | 600 | 섹션 제목 |
| Heading 2 | Noto Sans KR | 18–20px | 600 | 카드 제목, 폼 단계 제목 |
| Body | Noto Sans KR | 15–16px | 400 | 본문, 설명 |
| Caption | Noto Sans KR | 13px | 400 | 유의사항, 법적 고지 |
| Label | Instrument Sans | 12–13px | 600 | 폼 레이블, 태그 |
| Button | Instrument Sans | 15–16px | 600 | CTA, 버튼 텍스트 |

**Google Fonts CDN:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&family=Noto+Sans+KR:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 4. 컴포넌트 명세

### 4.1 CTA 버튼 (Primary)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 18px 32px;
  background: var(--red);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease),
              transform var(--dur-fast) var(--ease);
}
.btn-primary:hover {
  background: var(--red-dark);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}
.btn-primary:disabled {
  background: var(--border);
  color: var(--ink-light);
  cursor: not-allowed;
  transform: none;
}
```

### 4.2 날짜 카드 (체크박스 그룹)

```css
.date-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.date-card {
  position: relative;
  padding: 16px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease),
              background var(--dur-fast) var(--ease);
  user-select: none;
}

.date-card.selected {
  border-color: var(--border-sel);
  background: var(--red-soft);
}

.date-card input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.date-card .day-label {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
}

.date-card .weekday-label {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-mid);
  margin-top: 4px;
}

.date-card.selected .day-label,
.date-card.selected .weekday-label {
  color: var(--red);
}
```

### 4.3 라디오 그룹 (시간대 선호)

```css
.radio-group {
  display: flex;
  gap: 10px;
}

.radio-card {
  flex: 1;
  position: relative;
  padding: 14px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: center;
  transition: border-color var(--dur-fast) var(--ease),
              background var(--dur-fast) var(--ease);
}

.radio-card.selected {
  border-color: var(--border-sel);
  background: var(--red-soft);
}

.radio-card input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-card .radio-label {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

.radio-card.selected .radio-label {
  color: var(--red);
  font-weight: 600;
}
```

### 4.4 폼 인풋

```css
.form-field {
  margin-bottom: var(--space-md);
}

.form-label {
  display: block;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-mid);
  margin-bottom: 8px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.form-input {
  display: block;
  width: 100%;
  padding: 14px 16px;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--ink);
  outline: none;
  transition: border-color var(--dur-fast) var(--ease);
  box-sizing: border-box;
}

.form-input::placeholder {
  color: var(--ink-light);
}

.form-input:focus {
  border-color: var(--red);
}

.form-input.error {
  border-color: var(--red);
  background: #fff8f8;
}

.field-error {
  display: none;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--red);
  margin-top: 6px;
}

.field-error.visible {
  display: block;
}
```

### 4.5 진행률 바

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--border);
  z-index: 100;
}

.progress-fill {
  height: 100%;
  background: var(--red);
  transition: width var(--dur-med) var(--ease);
}
/* Step 1: 33%, Step 2: 66%, Step 3: 100% */
```

### 4.6 이벤트 정보 카드 (랜딩 섹션)

```css
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: var(--space-lg) 0;
}

.info-card {
  padding: var(--space-md);
  background: var(--bg);
  border-radius: var(--radius-md);
  text-align: center;
}

.info-card .info-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.info-card .info-title {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-light);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.info-card .info-value {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.4;
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .info-card {
    display: flex;
    align-items: center;
    gap: 16px;
    text-align: left;
    padding: 14px 16px;
  }
}
```

### 4.7 키트 섹션

```css
.kit-section {
  background: var(--bg);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-md);
  text-align: center;
}

.kit-image {
  width: 100%;
  max-width: 340px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
  object-fit: cover;
}

.kit-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

.kit-list li {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink);
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}

.kit-list li::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--red);
  flex-shrink: 0;
}

.kit-list li:last-child {
  border-bottom: none;
}

.kit-value-badge {
  display: inline-block;
  margin-top: var(--space-sm);
  padding: 6px 16px;
  background: var(--red);
  color: var(--white);
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
}
```

---

## 5. 레이아웃 시스템

### 5.1 페이지 컨테이너

```css
.container {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}
```

### 5.2 섹션 간격

- 랜딩 섹션 상하 패딩: `80px 0` (모바일: `60px 0`)
- 섹션 간 구분: 배경색 교체 (`--white` ↔ `--bg`) 또는 상하 패딩만으로 구분
- 섹션 제목 하단 마진: `32px`

### 5.3 폼 컨테이너

```css
.form-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}
```

### 5.4 반응형 브레이크포인트

| 브레이크포인트 | 적용 사항 |
|---------------|----------|
| 375px~ | 기본 모바일 레이아웃 |
| 480px~ | 라디오 카드 1행 배치 가능 |
| 768px~ | info-grid 3열 유지, 폼 최대 너비 480px |
| 1024px+ | 랜딩 섹션 좌우 여백 증가 |

---

## 6. 랜딩 섹션 시각 위계

```
[TOCOBO 워드마크]          ← 상단 고정 헤더 (white bg, border-bottom)
  
[히어로 블록]
  "IN MY SUN ERA"          ← Display / 700 / 48px / --ink
  부제: 서브카피 텍스트      ← Body / 400 / 16px / --ink-mid
  
[이벤트 정보 카드 3개]      ← --bg 배경 카드 그리드
  📅 기간 | 📍 장소 | 👤 대상
  
[혜택 섹션]                ← 배경: --bg 섹션
  [키트 이미지]
  [구성 목록]
  [8만원 상당 뱃지]
  
[유의사항]                 ← Caption / --ink-light
  
[CTA 버튼]                 ← --red pill 버튼, full-width (max 400px)
  "지금 신청하기"
```

---

## 7. 인터랙션 패턴

| 상태 | 동작 |
|------|------|
| 랜딩 → 폼 전환 | `display: none` ↔ `display: block` + `window.scrollTo(0,0)` |
| 날짜 카드 선택 | 클릭 시 `.selected` 토글, 테두리/배경 즉시 변경 |
| 폼 필드 에러 | submit 시도 시 `.error` 클래스 + `.visible` 에러 메시지 |
| 제출 중 | 버튼 disabled + 텍스트 "제출 중..." + 스피너 |
| 제출 성공 | 폼 숨기고 완료 화면 표시 |
| 제출 실패 | 에러 토스트 또는 인라인 메시지, 재시도 허용 |

---

## 8. 접근성 기준

- 모든 `<input>`, `<textarea>` → `aria-label` 또는 `<label for="">` 연결
- 필수 필드 → `aria-required="true"`
- 에러 메시지 → `role="alert"` 또는 `aria-live="polite"`
- 버튼 비활성 → `aria-disabled="true"` + `disabled` 속성
- 색상만으로 정보 전달 금지 — 선택 상태에 테두리 + 색상 조합 사용

---

## 9. 금지 패턴

- CSS 압축 / 단축 클래스명 (`.fb-p`, `.s-c` 등) — 가독성 저해
- 인라인 style="" 속성 남용
- 다크 배경 (`#0a0a0a`) 사용 — TOCOBO 브랜드와 불일치
- 핫핑크/앰버 계열 강조색 — TOCOBO 레드(#dc272d) 외 포인트색 추가 금지
- 배너 이미지 없이 단순 텍스트만으로 히어로 섹션 — 제품 이미지 반드시 포함
- 감탄사/이모지 과다 사용 — 브랜드 톤은 클린하고 절제됨
