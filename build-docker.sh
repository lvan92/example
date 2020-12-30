#!/usr/bin/env bash
REPOSITORY_ROOT_URI=event-services
TAG_NAME=event-svc
ARR_LOGIN_SERVER=ultrasynccontainerregistry.azurecr.io

docker build -t ${ARR_LOGIN_SERVER}/${REPOSITORY_ROOT_URI}:${TAG_NAME} ./

docker push ${ARR_LOGIN_SERVER}/${REPOSITORY_ROOT_URI}:${TAG_NAME}

echo "-----------DONE BUILD DOCKER------------"
exit 0