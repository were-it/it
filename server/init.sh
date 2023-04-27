#!/bin/sh

echo "$0 running as '$(whoami)'"

RELEASE_NAME="${RELEASE_NAME:-"it-server"}"
RELEASE_NODE="${RELEASE_NODE:-"$RELEASE_NAME"}"
RELEASE_DISTRIBUTION="${RELEASE_DISTRIBUTION:-"sname"}"

mix run --$RELEASE_DISTRIBUTION "$RELEASE_NODE"
