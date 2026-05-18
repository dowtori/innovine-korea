# TOCOBO × SIRIAI — 작업 인수인계 문서

**최종 업데이트:** 2026-05-18  
**레포:** `github.com/dowtori/innovine-korea`  
**담당:** SIRIAI (dowtori)

---

## 현재 완료된 작업

### 1. 기획 문서 (`docs/`)

| 파일 | 내용 | 상태 |
|------|------|------|
| `docs/PRD.md` | 캠페인 요건, 폼 구조, 데이터 페이로드, 기능/비기능 요건 전체 정의 | 완료 |
| `docs/DESIGN_SPEC.md` | TOCOBO 브랜드 분석, CSS 토큰, 컴포넌트 명세, 레이아웃 시스템, 금지 패턴 | 완료 |
| `docs/HANDOFF.md` | 이 파일 — 진행 현황 + 다음 작업 목록 | 완료 |

### 2. 모집 페이지 (`index.html`)

단일 파일 구조 (vanilla HTML/CSS/JS, 번들러 없음).

**랜딩 섹션:**
- 스티키 헤더 (`TOCOBO × SIRIAI` 워드마크)
- 히어로 이미지 (`images/671209664_18089595095611662_165543544357076035_n.jpg`) + 그라디언트 오버레이
- 이벤트 정보 카드 3개 (기간 / 장소 / 대상)
- 크리에이터 키트 섹션 (`images/tocobogift.jpg` + 구성 목록 + "8만원 상당" 뱃지)
- 안내사항 + CTA 버튼

**폼 섹션 (3단계):**
- Step 1: 이름 + 전화번호 (010-XXXX-XXXX 자동 포맷 + 유효성 검사)
- Step 2: 인스타그램 링크 또는 @계정명
- Step 3: 방문 가능일자 카드 × 7개 (5/18~5/24, 2열 그리드, 복수 선택) + 주/야간 선호 라디오 + 개인정보 동의
- 완료 화면

**브랜드:**
- 배경: `#ffffff` (화이트)
- 강조색: `#dc272d` (TOCOBO 레드)
- 폰트: Instrument Sans (헤딩) + Noto Sans KR (본문)

**Apps Script 연동:**
- 현재 `EP = null` (테스트 모드) — 콘솔 로그 + 성공 화면만 표시
- 연결 방법: `index.html` 하단 `<script>` 블록에서
  ```js
  // const EP = 'https://script.google.com/macros/s/REPLACE_ME/exec';
  const EP = null;
  ```
  → `REPLACE_ME` 자리에 Apps Script 배포 URL 입력 후 주석 교체

### 3. 이미지 파일 (`images/`)

| 파일 | 용도 |
|------|------|
| `671209664_18089595095611662_165543544357076035_n.jpg` | 히어로 이미지 (팝업 행사 현장) |
| `tocobogift.jpg` | 크리에이터 키트 대표 이미지 |

---

## 다음에 해야 할 작업 (우선순위 순)

### P0 — 배포 전 필수

- [ ] **Google Apps Script 연결**
  - Google Sheets에 제출 데이터 수집용 시트 생성
  - Apps Script 웹앱 배포 (POST JSON 수신 → 시트 기록)
  - `index.html` 내 `EP = null` → 실제 URL로 교체
  - 테스트: 폼 제출 → 시트에 1행 기록 확인

- [ ] **실제 배포 URL 결정**
  - Vercel / GitHub Pages / Netlify 중 선택
  - 도메인 또는 단축 URL로 링크 트리 / 인스타 바이오 연결

### P1 — 배포 후 개선

- [ ] **카피 최종 확인**
  - 히어로 서브카피 "태양을 더 자유롭게 즐기는 시간" → 클라이언트 컨펌 필요
  - 안내사항 5개 항목 → 실제 운영 정책 반영
  - 완료 화면 문구 → 선정 연락 방식(DM/문자) 명시 여부 결정

- [ ] **운영 시간 정보 추가** (확정 시)
  - 현재 주간/야간만 수집 중 — 실제 시간 확정되면 이벤트 정보 카드에 반영

- [ ] **TOCOBO 로고 이미지** (제공 시)
  - 현재: 텍스트 워드마크 (`TOCOBO × SIRIAI`)
  - SVG 또는 PNG 받으면 헤더 + 히어로 영역 교체

- [ ] **페이지 공유용 OG 태그**
  - `<meta property="og:image">` — 카카오/인스타 링크 미리보기용 이미지 지정
  - 현재 `<meta name="description">` 만 있음

### P2 — 선택적 개선

- [ ] **신청 마감 처리**
  - 마감일 지나면 CTA 버튼 비활성화 + "모집이 마감됐습니다" 문구 전환
  - 방법: 하드코딩 마감 날짜 비교 또는 Supabase flag 읽기

- [ ] **모집 인원 제한**
  - 선착순이면 신청 수 카운팅 필요 → Apps Script 또는 Supabase 연동 필요

---

## 로컬 실행 방법

별도 서버 불필요. 파일을 직접 브라우저에서 열면 동작.

```bash
# 방법 1: 파일 직접 열기
open tocobo/index.html   # macOS
start tocobo/index.html  # Windows

# 방법 2: 로컬 서버 (폰트/이미지 CORS 이슈 방지)
cd tocobo
python -m http.server 8080
# → http://localhost:8080
```

---

## 파일 구조

```
innovine-korea/
└── tocobo/
    ├── index.html           ← 모집 페이지 (단일 파일)
    ├── images/
    │   ├── 671209664_...jpg ← 히어로 이미지
    │   └── tocobogift.jpg   ← 키트 이미지
    └── docs/
        ├── PRD.md           ← 제품 요건 정의서
        ├── DESIGN_SPEC.md   ← 디자인 명세
        └── HANDOFF.md       ← 이 파일
```
