#!/bin/bash

set -e

# query all the things!
MONIKER=$(curl -s http://localhost:26657/status | jq -r '.result.node_info.moniker')
NETWORK=$(curl -s http://localhost:26657/status | jq -r '.result.node_info.network')
VOTING_POWER=$(curl -s http://localhost:26657/status | jq -r '.result.validator_info.voting_power')
PEERS=$(curl -s http://localhost:26657/net_info | jq -r '.result.n_peers')

if [ $VOTING_POWER == "0" ]
then
  curl -X POST https://aws-endpoint.amazonaws.com/dev/send -d '{"message": "Voting power is 0 for '$MONIKER' on '$NETWORK'", "apiToken": "uuid-here"}'
fi

if [ $PEERS == "1" ]
then
  curl -X POST https://aws-endpoint.amazonaws.com/dev/send -d '{"message": "PEERS has fallen to 1 for '$MONIKER' on '$NETWORK'", "apiToken": "uuid-here"}'
fi

if [ $PEERS == "0" ]
then
  curl -X POST https://aws-endpoint.amazonaws.com/dev/send -d '{"message": "PEERS has fallen to 0 for '$MONIKER' on '$NETWORK'", "apiToken": "uuid-here"}'
fi

