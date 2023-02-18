// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    string public uri;

    constructor(
        address to,
        string memory name,
        string memory symbol,
        string memory _uri
    ) ERC721(name, symbol) {
        _safeMint(to, 1);
        uri = _uri;
    }

    function burn() public virtual {
        require(_isApprovedOrOwner(_msgSender(), 1));
        _burn(1);
    }

    function tokenURI() public view returns (string memory) {
        return uri;
    }
}
