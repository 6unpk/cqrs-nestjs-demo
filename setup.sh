#!/bin/bash

help() {
  echo "READ README.MD!"
}

while getopts "p:u:P:h" opt
do
  case $opt in
    p) arg_p=$OPTARG
      ;;
    u) arg_u=$OPTARG
      ;;
    P) arg_P=$OPTARG
      ;;
    h) help ;;
  esac
done

# Setup Env
if [[ -z "$arg_p" ]]; then
  echo "use default port"
  port=3306
else
  port="$arg_p"
fi


if [[ -z "$arg_u" ]]; then
  echo "use default username"
  username="user"
else
  username="$arg_u"
fi

if [[ -z "$arg_P" ]]; then
  echo "use default password"
  password="abcd"
else
  password="$arg_P"
fi


# Check Docker & Docker Compose & Yarn
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

if ! command -v yarn &> /dev/null
then
    echo "yarn could not be found"
    echo "Yarn이 설치되지 않았거나 PATH에 등록되지 않았습니다!"
    exit
fi


# Run Yarn install
yarn

sed -i -e "s/user/$username/" -e "s/abcd/$password/" -e "s/127.0.0.1:3306/127.0.0.1:$port/" docker-compose.yaml
sed -i -e "s/user/$username/" -e "s/abcd/$password/" -e "s/3306/$port/" .env

# Run docker-compose
docker-compose up
