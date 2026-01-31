# GitHub 업로드 가이드

여울(Yeoul) 프로젝트를 GitHub에 업로드하는 단계별 가이드입니다.

## 1. GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인합니다
2. 우측 상단의 `+` 버튼을 클릭하고 `New repository`를 선택합니다
3. 저장소 정보를 입력합니다:
   - **Repository name**: `yeoul-platform` (또는 원하는 이름)
   - **Description**: `AI 세미나 토론 플랫폼 - 실시간 AI 에이전트와 3자 토론`
   - **Public/Private**: 원하는 옵션 선택
   - ⚠️ **중요**: `Add a README file`, `Add .gitignore`, `Choose a license` 옵션은 **체크하지 않습니다** (이미 프로젝트에 포함되어 있음)
4. `Create repository` 버튼을 클릭합니다

## 2. 로컬 프로젝트 준비

터미널을 열고 프로젝트 디렉토리로 이동한 후 다음 명령어를 실행합니다:

```bash
# Git 초기화
git init

# 모든 파일을 스테이징
git add .

# 첫 커밋 생성
git commit -m "Initial commit: Yeoul AI 세미나 토론 플랫폼"

# 기본 브랜치 이름을 main으로 설정 (필요한 경우)
git branch -M main
```

## 3. GitHub 저장소에 연결 및 푸시

GitHub에서 생성한 저장소의 URL을 사용합니다. 저장소 생성 후 보이는 페이지에서 URL을 복사할 수 있습니다.

```bash
# 원격 저장소 추가 (your-username과 repository-name을 실제 값으로 변경)
git remote add origin https://github.com/your-username/yeoul-platform.git

# 코드를 GitHub에 푸시
git push -u origin main
```

### SSH를 사용하는 경우:

```bash
# 원격 저장소 추가 (SSH)
git remote add origin git@github.com:your-username/yeoul-platform.git

# 코드를 GitHub에 푸시
git push -u origin main
```

## 4. 업로드 확인

1. GitHub 저장소 페이지로 돌아갑니다
2. 모든 파일이 정상적으로 업로드되었는지 확인합니다
3. README.md가 자동으로 표시되는지 확인합니다

## 5. 추가 설정 (선택사항)

### Repository 설정

1. 저장소 페이지에서 `Settings` 탭으로 이동
2. `General` 섹션에서:
   - Social preview 이미지 추가
   - Topics 추가: `react`, `typescript`, `ai`, `education`, `chat`, `tailwindcss`
3. `Pages` 섹션에서 GitHub Pages 설정 가능 (정적 사이트 호스팅)

### 프로젝트 보호

1. `Settings` > `Branches`로 이동
2. Branch protection rules 설정 고려

## 일반적인 Git 명령어

### 변경사항 추가 및 커밋

```bash
# 변경된 파일 확인
git status

# 특정 파일 스테이징
git add <filename>

# 모든 변경사항 스테이징
git add .

# 커밋
git commit -m "커밋 메시지"

# 푸시
git push
```

### 브랜치 작업

```bash
# 새 브랜치 생성
git checkout -b feature/new-feature

# 브랜치 전환
git checkout main

# 브랜치 푸시
git push -u origin feature/new-feature
```

## 문제 해결

### 인증 오류가 발생하는 경우

GitHub는 더 이상 비밀번호 인증을 지원하지 않습니다. 다음 중 하나를 사용해야 합니다:

1. **Personal Access Token (PAT)**
   - GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   - Generate new token으로 토큰 생성
   - 생성된 토큰을 비밀번호 대신 사용

2. **SSH Key**
   - [GitHub SSH 설정 가이드](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) 참조

### 푸시가 거부되는 경우

```bash
# 원격 저장소의 변경사항을 먼저 가져옴
git pull origin main --rebase

# 다시 푸시
git push
```

## 다음 단계

✅ GitHub Actions를 설정하여 CI/CD 파이프라인 구축  
✅ Issues 및 Projects를 사용하여 작업 관리  
✅ Wiki를 통해 문서화 강화  
✅ GitHub Pages로 데모 사이트 배포  

## 유용한 링크

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub 가이드](https://guides.github.com/)
- [GitHub CLI](https://cli.github.com/) - 커맨드라인에서 GitHub 작업 수행

---

Happy coding! 🚀
