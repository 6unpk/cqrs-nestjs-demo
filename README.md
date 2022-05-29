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

```
./setup -port 3306 -username <db_username> -password <db_password>
```

마찬가지로 Windows 의 경우 Powershell 스크립트를 실행합니다.

```
./setup.ps1 -port 3306 -username <db_username> -password <db_password>
```

### Test

E2E 테스트만 지원합니다.

```
yarn run test
```

커버리지를 확인은 다음과 같습니다.

```
yarn run coverage
```

http://localhost:8080/swagger-ui/index.html 에서 직접 테스트도 가능합니다.
