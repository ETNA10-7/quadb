#!/bin/bash

ADDR="0xc7de9a67a11878acbf39f1ed915cb9c1f814bd5baee50bfb0a0c610eacd7fdd1"

echo "📦 1. Initializing lending pool with 1_000_000"
aptos move run \
  --function-id ${ADDR}::lending::init \
  --profile default \
  --args u64:1000000

echo "🧾 2. Getting Lending Pool Balance"
aptos move run \
  --function-id ${ADDR}::lending::get_balance \
  --profile default

echo "🙋 3. Initializing borrower account"
aptos move run \
  --function-id ${ADDR}::borrowing::init \
  --profile default

echo "💸 4. Borrowing 500_000 from pool"
aptos move run \
  --function-id ${ADDR}::borrowing::borrow \
  --profile default \
  --args u64:500000

echo "🏦 5. Withdrawing borrowed funds"
aptos move run \
  --function-id ${ADDR}::borrowing::withdraw \
  --profile default

echo "🔁 6. Repaying 200_000 back"
aptos move run \
  --function-id ${ADDR}::borrowing::repay \
  --profile default \
  --args u64:200000

echo "📊 7. Checking borrower's remaining debt"
aptos move run \
  --function-id ${ADDR}::borrowing::get_borrowed \
  --profile default \
  --args address:${ADDR}

echo "💰 8. Final Lending Pool Balance"
aptos move run \
  --function-id ${ADDR}::lending::get_balance \
  --profile default
