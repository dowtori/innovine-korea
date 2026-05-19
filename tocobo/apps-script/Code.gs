/**
 * TOCOBO × SIRIAI "IN MY SUN ERA" — 신청 폼 수신용 Apps Script
 *
 * 대상 시트: https://docs.google.com/spreadsheets/d/1D7Rs9AfRRXWR1Q5vhuIGBhYD7xBKEEkQT4zSSv4o8aw/
 *
 * 배포 방법: 이 파일 하단 "배포 절차" 주석 참조.
 *
 * 폼 페이로드(클라이언트 → 이 스크립트):
 *   {
 *     campaign:    "TOCOBO × SIRIAI IN MY SUN ERA 2026",
 *     name:        "홍길동",
 *     phone:       "010-1234-5678",
 *     sns_link:    "https://www.instagram.com/example/" | "@example",
 *     visit_dates: "5/20(수), 5/21(목)",
 *     time_pref:   "주간 선호" | "야간 선호" | "상관없음",
 *     agr:         "동의",
 *     timestamp:   "2026-05-18T10:30:00.000Z"  // 클라이언트 ISO
 *   }
 *
 * 클라이언트는 fetch mode: 'no-cors' 로 보냅니다(응답 무시).
 * Content-Type 헤더가 application/json 으로 명시되어도 브라우저가 text/plain으로 다운그레이드하므로
 * postData.contents 의 원본 문자열을 직접 JSON.parse 합니다.
 */

const SHEET_ID = '1D7Rs9AfRRXWR1Q5vhuIGBhYD7xBKEEkQT4zSSv4o8aw';
const SHEET_NAME = 'submissions';
const TIMEZONE = 'Asia/Seoul';

const HEADERS = [
  'server_timestamp',
  'client_timestamp',
  'campaign',
  'name',
  'phone',
  'sns_link',
  'visit_dates',
  'time_pref',
  'agr',
  'address',
  'address_detail',
  'user_agent',
];

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '{}';
    const data = JSON.parse(raw);

    const sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

    const now = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
    const userAgent =
      (e && e.parameter && e.parameter.user_agent) ||
      (e && e.parameter && e.parameter.userAgent) ||
      '';

    sheet.appendRow([
      now,
      data.timestamp || '',
      data.campaign || '',
      data.name || '',
      data.phone || '',
      data.sns_link || '',
      data.visit_dates || '',
      data.time_pref || '',
      data.agr || '',
      data.address || '',
      data.address_detail || '',
      userAgent,
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    console.error('doPost error:', err);
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

// 헬스체크용 — 브라우저로 배포 URL 직접 열었을 때 확인 가능
function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'TOCOBO × SIRIAI submission endpoint',
    time: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX"),
  });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * 배포 절차
 *
 * 1. https://script.google.com/ 접속 → "새 프로젝트" 생성
 * 2. Code.gs 의 기본 코드 전부 삭제 후 이 파일 내용 통째로 붙여넣기
 * 3. 프로젝트명: "tocobo-siriai-form" 같은 식별 가능한 이름으로 설정
 * 4. 좌측 시계 아이콘(트리거) 아닌 "배포 > 새 배포"
 *    - 유형: 웹 앱
 *    - 설명: "TOCOBO × SIRIAI submission v1"
 *    - 실행 계정: "나"
 *    - 액세스 권한: "모든 사용자"  ← 반드시 이 설정. "Google 계정이 있는 모든 사용자" 아님
 * 5. "배포" 클릭 → 권한 승인 (Google Drive / Sheets 접근 허용)
 * 6. 발급되는 "웹 앱 URL" 복사
 *    형식: https://script.google.com/macros/s/AKfycb.../exec
 *
 * 7. innovine-korea/tocobo/index.html 에서 다음 줄을 교체:
 *      const EP = null;
 *    →
 *      const EP = 'https://script.google.com/macros/s/AKfycb.../exec';
 *
 * 8. git commit + push 하면 Vercel 자동 재배포
 *
 * 9. 라이브 페이지에서 테스트 제출 1건 → 시트에 1행 기록됐는지 확인
 *
 * ※ 코드 수정 후에는 매번 "배포 관리 > 새 버전 배포" 로 새 버전을 만들어야 적용됩니다.
 *   기존 URL 그대로 유지하면서 버전만 갱신하려면 "버전 > 새 버전" 선택.
 * ────────────────────────────────────────────────────────────────────────── */
