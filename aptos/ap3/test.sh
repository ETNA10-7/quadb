#!/bin/bash

LENDER_ADDR="0xc7de9a67a11878acbf39f1ed915cb9c1f814bd5baee50bfb0a0c610eacd7fdd1"
BORROWER_ADDR="0xc7de9a67a11878acbf39f1ed915cb9c1f814bd5baee50bfb0a0c610eacd7fdd1"

echo " 1. Initializing lending pool with 1_000_000"
aptos move run \
  --function-id lender::lending::init \
  --profile lender \
  --args u64:1000000

echo " 2. Getting Lending Pool Balance"
aptos move view \
  --function-id lender::lending::get_balance \
  --args address:$LENDER_ADDR

echo " 3. Initializing borrower account"
aptos move run \
  --function-id borrower::borrowing::init \
  --profile borrower

echo " 4. Borrowing 500_000 from pool"
aptos move run \
  --function-id borrower::borrowing::borrow \
  --profile borrower \
  --args address:$LENDER_ADDR u64:500000

echo " 5. Withdrawing borrowed funds (NOTE: Simulated call only)"
aptos move view \
  --function-id borrower::borrowing::withdraw \
  --args address:$BORROWER_ADDR

echo " 6. Repaying 200_000 back"
aptos move run \
  --function-id borrower::borrowing::repay \
  --profile borrower \
  --args address:$LENDER_ADDR u64:200000

echo " 7. Checking borrower's remaining debt"
aptos move view \
  --function-id borrower::borrowing::get_borrowed \
  --args address:$BORROWER_ADDR

echo " 8. Final Lending Pool Balance"
aptos move view \
  --function-id lender::lending::get_balance \
  --args address:$LENDER_ADDR
