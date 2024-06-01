// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

error OnlyPartyCreator();

contract RevenueHouse is ERC1155("") {
    // Функция для генерации пары "секретный ключ" и "открытый ключ"
    function generatePrivateKey(
        address _user,
        bytes32 _task_id
    ) public pure returns (bytes32 secretKey) {
        // Генерируем секретный ключ: это хеш от адреса пользователя и соли
        secretKey = keccak256(abi.encodePacked(_user, _task_id));

        return secretKey;
    }

    function checkPrivateKey(
        address _user,
        bytes32 _task_id,
        bytes32 _secretKey
    ) internal pure {
        bytes32 secretKey = generatePrivateKey(_user, _task_id);
        bytes32 publicKey = keccak256(abi.encodePacked(secretKey));
        bytes32 _publicKey = keccak256(abi.encodePacked(_secretKey));
        require(_publicKey == publicKey, "Ivalid secret key");
    }

    uint256 public lastPartyId;

    mapping(uint256 party_id => address influencer) public influencersParty;

    mapping(uint256 party_id => uint256 total_party_tasks)
        public total_party_tasks;

    mapping(bytes32 task_id => PartyTask) public party_tasks;

    struct PartyTask {
        uint256 temp;
    }

    event PartyCreated(address account, uint256 party_id);
    event PartyTaskCreated(bytes32 task_id, PartyTask partyTask);

    modifier onlyPartyCreator(uint256 party_id) {
        if (influencersParty[party_id] != _msgSender())
            revert OnlyPartyCreator();
        _;
    }

    function claim(uint256 party_id, bytes32 task_id, bytes32 salt) public {
        checkPrivateKey(msg.sender, task_id, salt);
        _mint(_msgSender(), party_id, 100000, "");
    }

    function createRS() public returns (uint256) {
        address sender = _msgSender();

        influencersParty[lastPartyId] = sender;
        emit PartyCreated(sender, lastPartyId);

        return ++lastPartyId;
    }

    function countTaskId(
        uint256 party_id,
        uint256 party_task_id,
        address influencer
    ) public pure returns (bytes32) {
        bytes32 task_id = keccak256(
            abi.encode(party_id, party_task_id, influencer)
        );
        return task_id;
    }

    function getTaskId(uint256 party_id) external view returns (bytes32) {
        uint256 party_task_id = total_party_tasks[party_id] + 1;
        address influencer = influencersParty[party_id];
        bytes32 task_id = countTaskId(party_id, party_task_id, influencer);
        return task_id;
    }

    function createTask(
        uint256 party_id,
        PartyTask calldata partyTask
    ) public onlyPartyCreator(party_id) returns (bytes32) {
        address influencer = influencersParty[party_id];
        uint256 party_task_id = total_party_tasks[party_id]++;
        bytes32 task_id = keccak256(
            abi.encode(party_id, party_task_id, influencer)
        );

        // проверки для таска

        party_tasks[task_id] = partyTask;
        emit PartyTaskCreated(task_id, partyTask);

        return task_id;
    }

    function burn(uint256 id, uint256 value) public {
        _burn(_msgSender(), id, value);
    }

    function burnBatch(uint256[] memory ids, uint256[] memory values) public {
        _burnBatch(_msgSender(), ids, values);
    }
}
