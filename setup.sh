# Setup Env
if [[ -z "$1" ]]; then
  echo "No database port given, use default port"
  $port = 3306
fi

if [[ -z "$2" ]]; then
  echo "No database username given, use default username"
  $username = 'user'
fi

if [[ -z "$2" ]]; then
  echo "No database password given, use default port"
  $password = 'abcd'
fi


# Check liquibase
if ! command -v liquibase &> /dev/null
then
    echo "liquibase could not be found"
    echo "liquibase가 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    echo "liquibase 설치를 진행하겠습니까? [Y\N]"
    read keep
    if [[ -z "$1" ]]; then
      echo "No database port given, use default port"
    fi
    else
      curl http://sourceforge.net/projects/liquibase/files/Liquibase%20Core/liquibase-3.2.0-bin.tar.gz/download -O liquibase-3.2.0-bin.tar.gz
      tar -xvzf liquibase-3.2.0-bin.tar.gz

fi


# Check Docker & Docker Compose
if ! command -v docker &> /dev/null
then
    echo "docker could not be found"
    echo "Docker가 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    exit
fi


if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose could not be found"
    echo "Docker Compose가 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    exit
fi

# Run docker-compose
docker-compose up 

# Run Liquibase
./liquibase \
    --url="localhost:$port" \
    --username="$username" \
    --password="$password" \
    --defaults-file="migrations/liquibase.properties" \
    update