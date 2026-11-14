# ERP 라운지

곰선비의 ERP 라운지 정적 웹사이트 (GitHub Pages 배포용)

## 구조
- `index.html` — 라운지 첫 화면
- `config.js` — Supabase 연결 정보 (회원가입·게시판)
- `apps/` — 모듈 실습앱(MM·SD·PP·FI·CO), 용어집, SAP 표준 사전, IMG 가이드, ERP 케이스 스터디, 관세환급, SAP ABAP Programming, 아밥준, 게시판, 실습 환경 가이드
- `docs/supabase-setup.sql` — 게시판 테이블 생성 SQL (사이트에는 쓰이지 않음)

## 배포 (GitHub Pages)
1. 이 폴더의 파일을 저장소 루트에 올립니다.
2. Settings → Pages → Branch: `main` / `(root)` → Save.
3. 1~2분 뒤 `https://<계정>.github.io/<저장소>/` 에서 열립니다.

## 회원가입 · 게시판 켜기 (선택)
1. Supabase 프로젝트를 만듭니다.
2. `docs/supabase-setup.sql`의 `admin@example.com`을 관리자 이메일로 바꾼 뒤 SQL Editor에서 실행합니다.
3. `config.js`에 Project URL과 anon key를 넣습니다.
4. Supabase → Authentication → URL Configuration에 GitHub Pages 주소를 등록합니다.
