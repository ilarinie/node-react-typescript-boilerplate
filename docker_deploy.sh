#!/bin/bash
if [[ -z "$TRAVIS_TAG" ]]; then
  echo "Deploying nightly"
  curl --data -X POST $DOCKER_URL
else
  echo "Deploying $TRAVIS_TAG"
  curl -H "Content-Type: application/json" --data '{"source_type": "Tag", "source_name": "'"$TRAVIS_TAG"'"}' $DOCKER_URL
  curl -X POST $DOCKER_URL
fi
