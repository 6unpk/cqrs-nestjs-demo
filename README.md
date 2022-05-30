# CQRS Based Nest.js

cqrs 패턴을 적용한 테스트 어플리케이션입니다.

### Prerequisite

- Docker & Docker Compose
- Node v16 이상
- Yarn v3 이상

### Setup

Package Manager는 가급적이면 Yarn을 씁시다!

```
yarn install
```

MacOs, Linux 의 경우 다음 sh 스크립트를 실행합니다. DB 및 관련 의존성 설정을 자동으로 진행합니다. 별도의 인자를 넣지 않으면 기본 설정값으로 진행됩니다.

```-p [포트] -u [기본사용자] -P [기본사용자 패스워드]```

```
./setup.sh
```

마찬가지로 Windows 의 경우 Powershell 스크립트를 실행합니다.

```
./setup.ps1
```

### Test

E2E 테스트만 지원합니다. E2E 테스트 전 반드시 Docker DB 컨테이너가 구동되어야합니다.

```
yarn run test:e2e
```

http://localhost:8080/api 에서 직접 테스트도 가능합니다.
