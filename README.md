# Call Restrict

A library for restricting the call of a solidity smart contract function by time or count. It can be used to set a time limit between two consecutive calls for each user, ensuring that a function cannot be called again until the specified time has passed. Also, it can be used to set a count limit on calls for each user, ensuring that a function cannot be called more than the specified amount.

## Usage

using time restriction to make sure that a function can only be called once every 1 minute for each user:

```solidity
pragma solidity ^0.8.0;

import './CallRestrict.sol';

contract YourContract is CallRestrict{

    function timeRestrictedFunction() public timeRestrict(0, 1 minutes) {
        ...
    }
}
```


using count restriction to make sure that a function can only be called twice for each user:

```solidity
pragma solidity ^0.8.0;

import './CallRestrict.sol';

contract YourContract is CallRestrict{

    function countRestrictedFunction() public countRestrict(1, 2) {
        ...
    }
}
```

### Note:

First parameter of timeRestrict and countRestrict is the id of the function, which is used to distinguish different functions. You should use different id for different functions to avoid unexpected behavior.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details