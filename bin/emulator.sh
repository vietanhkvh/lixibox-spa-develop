#!/usr/bin/env bash

ENV_TMP=".env.tmp"

getHostname() {
  if [[ ! -e $1 ]]; then
    echo "$1 must exist on project root"
    exit 1
  fi

  HOST_STRING=`cat $1 | grep HOST=`
  if [[ -z $HOST_STRING ]]; then
    echo "'HOST' var doesn't exist on $1, or is empty"
    exit 1
  fi

  HOSTNAME=`echo ${HOST_STRING#HOST=} | sed -r 's/\"//g'`
  return 0
}


if [[ `whoami` != 'root' ]]; then
  echo "Script must be run as 'root'"
  exit 1
fi

if [[ ! -e "package.json" ]]; then
  echo "Script must run from project root"
  exit 1
fi

Commands=('emulate' 'emulate-off' 'start')
if [[ ! " ${Commands[@]} " =~ $1 ]]; then
  echo "Must specify a valid command (any of 'emulate', 'emulate-off', 'start')"
  exit 1
fi

if [[ $1 == "emulate" ]]; then
  if [[ -z $2 ]]; then
    echo "Must specify an environment (e.g. 'staging', 'qa', 'staging-fe')"
    exit 1
  fi

  if [[ `sed '$!d' /etc/hosts` == *"$2 emulated"* ]]; then
    echo "$2 env is already emulated"
    exit 1
  fi
  if [[ `sed '$!d' /etc/hosts` == *"emulated"* ]]; then
    echo "an env is already emulated"
    exit 1
  fi

  getHostname ".env.$2"
  echo "127.0.0.1 ${HOSTNAME} # $2 emulated" >> /etc/hosts
  echo "127.0.0.1 www.${HOSTNAME} # $2 emulated" >> /etc/hosts

  cp ".env.$2" $ENV_TMP
  if [[ ! -z `cat $ENV_TMP | grep PORT=` ]]; then
    sed -i '' 's/.*PORT=.*/PORT=443/' $ENV_TMP
  fi
  if [[ ! -z `cat $ENV_TMP | grep REACT_APP_SCRIPT_PATH=` ]]; then
    sed -i '' 's/.*REACT_APP_SCRIPT_PATH=.*/REACT_APP_SCRIPT_PATH="tmp\/scripts"/' $ENV_TMP
  fi

  env-cmd -f $ENV_TMP ./bin/prestart.sh

  echo "$2 emulated!"
  exit
fi

if [[ $1 == "emulate-off" ]]; then
  if [[ -e $ENV_TMP ]]; then
    rm $ENV_TMP
  fi

  if [[ `sed '$!d' /etc/hosts` == *"emulated"* ]]; then
    sed -i '' -e '$ d' /etc/hosts
  fi
  if [[ `sed '$!d' /etc/hosts` == *"emulated"* ]]; then
    sed -i '' -e '$ d' /etc/hosts
  fi

  rm -rf public/tmp

  echo "emulation removed!"
  exit
fi

if [[ $1 == "start" ]]; then
  yarn start:env
  exit
fi
