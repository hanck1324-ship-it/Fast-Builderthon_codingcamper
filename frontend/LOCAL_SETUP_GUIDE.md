# 여울(Yeoul) 프로젝트 로컬 설치 가이드

이 가이드는 여울 프로젝트를 여러분의 컴퓨터에 다운로드하고 실행하는 방법을 안내합니다.

---

## 📥 방법 1: GitHub에서 다운로드 (권장)

### 1단계: 프로젝트를 GitHub에 업로드

먼저 `UPLOAD_INSTRUCTIONS.md` 파일의 지침을 따라 GitHub에 프로젝트를 업로드합니다.

### 2단계: 로컬 컴퓨터에 다운로드

#### 옵션 A: Git Clone (권장)

```bash
# 원하는 폴더로 이동
cd ~/Documents

# 저장소 복제
git clone https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper.git

# 프로젝트 폴더로 이동
cd Fast-Builderthon_codingcamper
```

#### 옵션 B: ZIP 다운로드

1. https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper 접속
2. 녹색 **Code** 버튼 클릭
3. **Download ZIP** 선택
4. 다운로드한 ZIP 파일 압축 해제
5. 압축 해제한 폴더로 이동

---

## 📥 방법 2: 수동 다운로드 (GitHub 없이)

현재 Figma Make 환경에서 파일을 복사하여 로컬에 수동으로 생성해야 합니다.

### 필요한 폴더 구조 생성

```bash
mkdir yeoul-platform
cd yeoul-platform

mkdir -p components/ui
mkdir -p data
mkdir -p styles
mkdir -p guidelines
```

### 각 파일 복사

Figma Make에서 각 파일의 내용을 복사하여 로컬에 동일한 경로로 생성합니다:

- `/App.tsx`
- `/components/HomePage.tsx`
- `/components/MainChatUI.tsx`
- ... (모든 파일)

---

## 🔧 로컬 환경 설정

### 필수 요구사항

- **Node.js** 18.x 이상
- **npm** 또는 **yarn** 또는 **pnpm**

Node.js 설치 확인:
```bash
node --version
npm --version
```

Node.js가 없다면 https://nodejs.org 에서 다운로드하세요.

### 1단계: package.json 생성

프로젝트 루트에 `package.json` 파일을 생성합니다:

```json
{
  "name": "yeoul-platform",
  "version": "1.0.0",
  "type": "module",
  "description": "여울 - AI 세미나 토론 플랫폼",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^10.18.0",
    "lucide-react": "^0.454.0",
    "recharts": "^2.12.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "typescript": "^5.6.2",
    "vite": "^5.4.10",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
```

### 2단계: TypeScript 설정

`tsconfig.json` 파일 생성:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json` 파일 생성:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### 3단계: Vite 설정

`vite.config.ts` 파일 생성:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### 4단계: index.html 생성

프로젝트 루트에 `index.html` 파일 생성:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>여울(Yeoul) - AI 세미나 토론 플랫폼</title>
    <meta name="description" content="AI 에이전트와 함께하는 실시간 3자 토론 플랫폼" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### 5단계: main.tsx 생성

프로젝트 루트에 `main.tsx` 파일 생성:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 6단계: 의존성 설치

터미널에서 프로젝트 폴더로 이동 후:

```bash
# npm 사용 시
npm install

# 또는 yarn 사용 시
yarn install

# 또는 pnpm 사용 시
pnpm install
```

---

## 🚀 프로젝트 실행

### 개발 서버 시작

```bash
# npm 사용 시
npm run dev

# 또는 yarn 사용 시
yarn dev

# 또는 pnpm 사용 시
pnpm dev
```

브라우저에서 표시되는 주소 (보통 `http://localhost:5173`)로 접속하세요!

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

---

## 📁 최종 프로젝트 구조

```
yeoul-platform/
├── index.html
├── main.tsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── README.md
├── App.tsx
├── components/
│   ├── HomePage.tsx
│   ├── MainChatUI.tsx
│   ├── AudioVisualizer.tsx
│   ├── TokenRewardPopup.tsx
│   ├── ... (기타 컴포넌트들)
│   └── ui/
│       └── ... (UI 컴포넌트들)
├── data/
│   └── mockData.ts
├── styles/
│   └── globals.css
└── guidelines/
    └── Guidelines.md
```

---

## 🐛 문제 해결

### "Cannot find module" 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트 충돌 오류

다른 앱이 5173 포트를 사용 중일 수 있습니다. `vite.config.ts`에서 포트 변경:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 원하는 포트 번호
  },
})
```

### Tailwind CSS 스타일이 적용되지 않는 경우

`styles/globals.css` 파일이 정확히 임포트되었는지 확인하세요.

---

## ✅ 확인 사항

- [x] Node.js 설치 완료
- [x] 프로젝트 다운로드 완료
- [x] package.json 생성 완료
- [x] 설정 파일들(tsconfig, vite.config) 생성 완료
- [x] index.html, main.tsx 생성 완료
- [x] 의존성 설치 완료 (`npm install`)
- [x] 개발 서버 실행 성공 (`npm run dev`)
- [x] 브라우저에서 앱 확인 완료

---

## 🎉 완료!

이제 로컬 환경에서 여울 플랫폼을 자유롭게 개발하고 수정할 수 있습니다!

추가 질문이 있으시면 GitHub Issues를 활용하세요.

Happy Coding! 🚀
