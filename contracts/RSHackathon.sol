pragma solidity 0.8.24;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract RSHackathon is ERC1155("") {

    uint256 public lastRS = 0;

    event RSCreated(address account, uint256 id, uint256 amount);
    event Redeem(address account, uint256 id, uint256 amount);

    error Transferless();

    function redeem (
        address influencer,
        uint256 id,
        uint256 value,
        bytes32 salt
    ) public {
        address sender = _msgSender();


        // if salt norm to


        _safeTransferFrom(influencer, sender, id, value, "");

        emit Redeem(sender, id, value);
    }

    function createRS(
        uint256 value
    ) public returns (uint256){
        address sender = _msgSender();
        _mint(sender, lastRS, value, "");
        emit RSCreated(sender, lastRS, value);

        return ++lastRS;
    }

    function safeBatchTransferFrom(address from,address to,uint256[] memory ids,uint256[] memory values,bytes memory data) public override {revert Transferless();}
    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes memory data) public override {revert Transferless();} 
    function setApprovalForAll(address operator, bool approved) public override {revert Transferless();}
    function isApprovedForAll(address account, address operator) public view override returns (bool) {revert Transferless();}
}