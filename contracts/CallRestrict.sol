// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CallRestrict {
    // address => id => last time stamp
    mapping(address => mapping(uint256 => uint256)) public timeMap;

    modifier timeRestrict(uint256 id, uint256 _time) {
        require(
            timeMap[msg.sender][id] + _time < block.timestamp,
            "CallRestrict: timeRestrict"
        );
        timeMap[msg.sender][id] = block.timestamp;
        _;
    }

    // address => id => current count
    mapping(address => mapping(uint256 => uint256)) public countMap;

    modifier countRestrict(uint256 id, uint256 _count) {
        require(
            countMap[msg.sender][id] < _count,
            "CallRestrict: countRestrict"
        );
        countMap[msg.sender][id] += 1;
        _;
    }
}
