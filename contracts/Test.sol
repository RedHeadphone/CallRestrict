// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CallRestrict.sol";

contract Test is CallRestrict {
    function time_check() public timeRestrict(1, 1 minutes) {}

    function count_check() public countRestrict(1, 2) {}
}
