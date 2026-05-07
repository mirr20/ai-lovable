# md파일 수정했음. <br>

- html태그를 일부 쓸 때는 한 줄을 떨어지게 해야함. <br>

<hr>

# 스마트 가계부 대시보드

Vue 3 (Composition API) + Pinia + Bootstrap 5 + Google Charts + Font Awesome + json-server + axios 로 만든 가계부 SPA입니다.

## 기술 스택
- **Vue 3** (Composition API, `<script setup>`, ES6 모듈)
- **Pinia** — 상태관리 (`src/stores/transaction.js`)
- **axios** — `src/stores/api.js` 에서 인스턴스 생성, Pinia 스토어에서 json-server 호출
- **json-server** — Mock REST API (`db.json`, port 3001)
- **Bootstrap 5** — 그리드 / 컴포넌트 / 유틸리티
- **Google Charts** — 파이/라인/바 차트 (`src/components/GoogleChart.vue`)
- **Font Awesome 6** — 아이콘 (CDN)

## 실행 방법

```bash
npm install

# 1) json-server 와 vite 동시 실행
npm start

# 또는 따로 실행
npm run server   # http://localhost:3001
npm run dev      # http://localhost:5173
```

## 폴더 구조

```
src/
├─ main.js
├─ App.vue
├─ assets/main.css
├─ router/index.js
├─ stores/
│  ├─ api.js            # axios 인스턴스 (json-server baseURL)
│  └─ transaction.js    # Pinia 스토어 - 거래 CRUD
├─ components/
│  ├─ StatCard.vue
│  └─ GoogleChart.vue   # Google Charts 래퍼
└─ views/
   ├─ Dashboard.vue     # 대시보드 (4개 통계 + 3개 차트 + 최근 거래)
   ├─ Transactions.vue  # 거래 내역 목록 (검색/필터/삭제)
   └─ AddTransaction.vue
```

## 컴포넌트 구성도

```mermaid
flowchart TD
  subgraph App[Vue App]
    Main[src/main.js] --> AppVue[src/App.vue]
    AppVue --> Router[vue-router<br/>src/router/index.js]
    Router --> Dash[src/views/Dashboard.vue]
    Router --> TxList[src/views/Transactions.vue]
    Router --> TxAdd[src/views/AddTransaction.vue]
  end

  subgraph UI[UI Components]
    Stat[src/components/StatCard.vue]
    Chart[src/components/GoogleChart.vue]
  end

  subgraph State[State / Data]
    Store[Pinia Store<br/>src/stores/transaction.js]
    Api[axios instance<br/>src/stores/api.js]
    Server[json-server<br/>db.json :3001]
  end

  Dash --> Stat
  Dash --> Chart

  Dash --> Store
  TxList --> Store
  TxAdd --> Store

  Store --> Api --> Server
```

## API 엔드포인트 (json-server)
- `GET    /transactions`
- `POST   /transactions`
- `DELETE /transactions/:id`
- `GET    /categories`

샘플 거래 100건이 `db.json` 에 미리 포함되어 있습니다.
