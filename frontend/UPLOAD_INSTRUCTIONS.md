# 여울 프로젝트 GitHub 업로드 안내

이 문서는 여울(Yeoul) 프로젝트를 다음 저장소에 업로드하는 방법을 안내합니다:

**저장소 URL**: https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper.git

---

## 📋 업로드 전 체크리스트

✅ 모든 파일이 준비되어 있습니다  
✅ `.gitignore` 파일이 생성되어 있습니다  
✅ `README.md`가 작성되어 있습니다  
✅ 프로젝트가 정상 작동하는지 확인되었습니다  

---

## 🚀 업로드 단계

### 1단계: 터미널 열기

프로젝트 폴더에서 터미널(또는 명령 프롬프트)를 엽니다.

### 2단계: Git 초기화 및 파일 추가

다음 명령어를 **순서대로** 실행하세요:

```bash
# Git 초기화
git init

# 모든 파일을 스테이징 영역에 추가
git add .

# 첫 번째 커밋 생성
git commit -m "Initial commit: 여울(Yeoul) AI 세미나 토론 플랫폼"

# 기본 브랜치 이름을 main으로 설정
git branch -M main
```

### 3단계: GitHub 저장소에 연결

```bash
# 원격 저장소 추가
git remote add origin https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper.git
```

### 4단계: 저장소에 푸시

```bash
# GitHub에 코드 업로드
git push -u origin main
```

⚠️ **만약 저장소에 이미 파일이 있다면**, 다음 명령어를 사용하세요:

```bash
# 강제 푸시 (기존 내용을 덮어씁니다)
git push -u origin main --force
```

---

## 🔐 인증 방법

GitHub는 비밀번호 인증을 지원하지 않습니다. 다음 중 하나를 선택하세요:

### 방법 1: Personal Access Token (권장)

1. GitHub에 로그인
2. 우측 상단 프로필 클릭 → **Settings**
3. 좌측 메뉴 맨 아래 **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token (classic)** 클릭
6. Note: "Yeoul Project Upload"
7. Expiration: 원하는 기간 선택
8. Scopes: **repo** 체크 (전체 선택)
9. **Generate token** 클릭
10. 생성된 토큰을 **복사하여 안전한 곳에 보관**

푸시할 때 비밀번호 입력 창이 나오면:
- Username: GitHub 아이디
- Password: 복사한 Personal Access Token 붙여넣기

### 방법 2: SSH Key

```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 에이전트 시작
eval "$(ssh-agent -s)"

# SSH 키 추가
ssh-add ~/.ssh/id_ed25519

# 공개 키 출력 (이것을 복사)
cat ~/.ssh/id_ed25519.pub
```

GitHub에 SSH 키 등록:
1. GitHub Settings → SSH and GPG keys
2. New SSH key 클릭
3. 복사한 공개 키 붙여넣기
4. Add SSH key 클릭

그 다음 원격 저장소를 SSH로 변경:
```bash
git remote set-url origin git@github.com:hanck1324-ship-it/Fast-Builderthon_codingcamper.git
git push -u origin main
```

---

## ✅ 업로드 확인

1. 브라우저에서 https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper 접속
2. 모든 파일이 업로드되었는지 확인
3. README.md가 자동으로 표시되는지 확인

---

## 🔧 문제 해결

### 오류: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper.git
```

### 오류: "Updates were rejected"

```bash
# 강제 푸시 (주의: 기존 내용이 삭제됩니다)
git push -u origin main --force
```

### 오류: "failed to push some refs"

```bash
# 원격 저장소의 변경사항을 먼저 가져오기
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📝 이후 변경사항 업로드하기

파일을 수정한 후:

```bash
# 변경사항 확인
git status

# 모든 변경사항 추가
git add .

# 커밋
git commit -m "설명적인 커밋 메시지"

# 푸시
git push
```

---

## 🎯 완료!

성공적으로 업로드되면, 저장소 URL에서 여울 프로젝트를 확인할 수 있습니다:
👉 https://github.com/hanck1324-ship-it/Fast-Builderthon_codingcamper

---

문제가 발생하면 터미널의 오류 메시지를 확인하고 위의 문제 해결 섹션을 참고하세요! 🚀
