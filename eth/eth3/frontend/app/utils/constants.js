export const contractAddress = "0xa6d982060Efc1bF3EA19307EeC93A962950c9B18";
export const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "newText",
                "type": "string"
            }
        ],
        "name": "TextUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getStoredText",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "storedText",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newText",
                "type": "string"
            }
        ],
        "name": "updateWithMemory",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newText",
                "type": "string"
            }
        ],
        "name": "updateWithStorage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]