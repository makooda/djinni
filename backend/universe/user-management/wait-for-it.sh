#!/usr/bin/env bash
# Enhanced wait-for-it.sh — robust TCP port checker with timeout, interval, retries, and clearer logs

WAITFORIT_cmdname=${0##*/}

echoerr() {
  if [[ $WAITFORIT_QUIET -ne 1 ]]; then echo "$@" 1>&2; fi
}

usage() {
  cat << USAGE >&2
Usage:
  $WAITFORIT_cmdname host:port [-s] [-t timeout] [-- command args]
  -h HOST | --host=HOST        Host or IP under test
  -p PORT | --port=PORT        TCP port under test
                               Or use host:port directly
  -s | --strict                Only run subcommand if the host:port check succeeds
  -q | --quiet                 Suppress output except errors
  -t TIMEOUT | --timeout=TIMEOUT
                               Timeout in seconds (0 = no timeout)
  -- COMMAND ARGS              Command to execute after check passes
Environment variables:
  WAITFORIT_INTERVAL           Interval between checks (default: 1)
  WAITFORIT_MAX_ATTEMPTS       Max number of attempts before giving up (default: 0 = infinite)
USAGE
  exit 1
}

wait_for() {
  WAITFORIT_start_ts=$(date +%s)
  WAITFORIT_attempts=0

  if ! getent hosts "$WAITFORIT_HOST" > /dev/null; then
    echoerr "$WAITFORIT_cmdname: ERROR - Cannot resolve host '$WAITFORIT_HOST'"
    return 1
  fi

  if [[ $WAITFORIT_TIMEOUT -gt 0 ]]; then
    echoerr "$WAITFORIT_cmdname: waiting up to $WAITFORIT_TIMEOUT seconds for $WAITFORIT_HOST:$WAITFORIT_PORT"
  else
    echoerr "$WAITFORIT_cmdname: waiting for $WAITFORIT_HOST:$WAITFORIT_PORT without timeout"
  fi

  while :
  do
    ((WAITFORIT_attempts++))

    if [[ $WAITFORIT_ISBUSY -eq 1 ]]; then
      nc -z "$WAITFORIT_HOST" "$WAITFORIT_PORT"
    else
      (echo -n > /dev/tcp/$WAITFORIT_HOST/$WAITFORIT_PORT) >/dev/null 2>&1
    fi
    WAITFORIT_result=$?

    if [[ $WAITFORIT_result -eq 0 ]]; then
      WAITFORIT_end_ts=$(date +%s)
      echoerr "$WAITFORIT_cmdname: $WAITFORIT_HOST:$WAITFORIT_PORT is available after $((WAITFORIT_end_ts - WAITFORIT_start_ts)) seconds"
      break
    fi

    if (( WAITFORIT_attempts % 5 == 0 )); then
      echoerr "$WAITFORIT_cmdname: still waiting for $WAITFORIT_HOST:$WAITFORIT_PORT..."
    fi

    if [[ $WAITFORIT_MAX_ATTEMPTS -gt 0 && $WAITFORIT_attempts -ge $WAITFORIT_MAX_ATTEMPTS ]]; then
      echoerr "$WAITFORIT_cmdname: giving up after $WAITFORIT_attempts attempts"
      return 1
    fi

    sleep $WAITFORIT_INTERVAL
  done

  return 0
}

wait_for_wrapper() {
  if [[ $WAITFORIT_QUIET -eq 1 ]]; then
    timeout $WAITFORIT_BUSYTIMEFLAG $WAITFORIT_TIMEOUT $0 --quiet --child --host=$WAITFORIT_HOST --port=$WAITFORIT_PORT --timeout=$WAITFORIT_TIMEOUT &
  else
    timeout $WAITFORIT_BUSYTIMEFLAG $WAITFORIT_TIMEOUT $0 --child --host=$WAITFORIT_HOST --port=$WAITFORIT_PORT --timeout=$WAITFORIT_TIMEOUT &
  fi
  WAITFORIT_PID=$!
  trap "kill -INT -$WAITFORIT_PID" INT
  wait $WAITFORIT_PID
  WAITFORIT_RESULT=$?
  if [[ $WAITFORIT_RESULT -ne 0 ]]; then
    echoerr "$WAITFORIT_cmdname: timeout occurred after $WAITFORIT_TIMEOUT seconds waiting for $WAITFORIT_HOST:$WAITFORIT_PORT"
  fi
  return $WAITFORIT_RESULT
}

# Default values
WAITFORIT_TIMEOUT=${WAITFORIT_TIMEOUT:-15}
WAITFORIT_INTERVAL=${WAITFORIT_INTERVAL:-1}
WAITFORIT_MAX_ATTEMPTS=${WAITFORIT_MAX_ATTEMPTS:-0}
WAITFORIT_STRICT=0
WAITFORIT_CHILD=0
WAITFORIT_QUIET=0

# Parse arguments
while [[ $# -gt 0 ]]
do
  case "$1" in
    *:* )
      WAITFORIT_hostport=(${1//:/ })
      WAITFORIT_HOST=${WAITFORIT_hostport[0]}
      WAITFORIT_PORT=${WAITFORIT_hostport[1]}
      shift 1
      ;;
    --child)
      WAITFORIT_CHILD=1
      shift 1
      ;;
    -q | --quiet)
      WAITFORIT_QUIET=1
      shift 1
      ;;
    -s | --strict)
      WAITFORIT_STRICT=1
      shift 1
      ;;
    -h)
      WAITFORIT_HOST="$2"; shift 2
      ;;
    --host=*)
      WAITFORIT_HOST="${1#*=}"; shift 1
      ;;
    -p)
      WAITFORIT_PORT="$2"; shift 2
      ;;
    --port=*)
      WAITFORIT_PORT="${1#*=}"; shift 1
      ;;
    -t)
      WAITFORIT_TIMEOUT="$2"; shift 2
      ;;
    --timeout=*)
      WAITFORIT_TIMEOUT="${1#*=}"; shift 1
      ;;
    --)
      shift; WAITFORIT_CLI=("$@"); break
      ;;
    --help)
      usage
      ;;
    *)
      echoerr "Unknown argument: $1"
      usage
      ;;
  esac
done

# Required fields
if [[ -z "$WAITFORIT_HOST" || -z "$WAITFORIT_PORT" ]]; then
  echoerr "Error: host and port are required."
  usage
fi

# Check if 'timeout' is busybox
WAITFORIT_TIMEOUT_PATH=$(type -p timeout)
WAITFORIT_TIMEOUT_PATH=$(realpath $WAITFORIT_TIMEOUT_PATH 2>/dev/null || readlink -f $WAITFORIT_TIMEOUT_PATH)
WAITFORIT_BUSYTIMEFLAG=""
if [[ $WAITFORIT_TIMEOUT_PATH =~ "busybox" ]]; then
  WAITFORIT_ISBUSY=1
  if timeout &>/dev/stdout | grep -q -e '-t '; then
    WAITFORIT_BUSYTIMEFLAG="-t"
  fi
else
  WAITFORIT_ISBUSY=0
fi

if [[ $WAITFORIT_CHILD -gt 0 ]]; then
  wait_for
  exit $?
else
  if [[ $WAITFORIT_TIMEOUT -gt 0 ]]; then
    wait_for_wrapper
  else
    wait_for
  fi
  WAITFORIT_RESULT=$?

  if [[ $WAITFORIT_CLI != "" ]]; then
    if [[ $WAITFORIT_RESULT -ne 0 && $WAITFORIT_STRICT -eq 1 ]]; then
      echoerr "$WAITFORIT_cmdname: strict mode — refusing to run command due to failure"
      exit $WAITFORIT_RESULT
    fi
    echoerr "$WAITFORIT_cmdname: executing command: ${WAITFORIT_CLI[*]}"
    exec "${WAITFORIT_CLI[@]}"
  else
    exit $WAITFORIT_RESULT
  fi
fi
