var js = {}
window.cp = {}
window.cp.eth = {}
window.cp.eth.connected = false
window.cp.eth.accounts = []

const contractInterface = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "makeMeSomePisscoin",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const contractAddress = "0xf286048c5838b97447533c3b0b481f7f519bbfbd"

var eth = {}
eth.ether = x => {
    var rate = new BigNumber(1000000000000000000)
    var f = rate * new BigNumber(x);
    return f.toString();
}

eth.gwei = x => {
    var rate = new BigNumber(1000000000)
    var f = rate * new BigNumber(x);
    return f.toString();
}

js.setAddrText = function(text)
{
    var el = document.getElementById('gaming')
    el.innerHTML = text;
}

js.onload = async function()
{
    if (!window.ethereum)
    {
        alert('fuck you install metamask')
        return;
    }

    var chain = await ethereum.request({method: 'eth_chainId'});
    if (chain != 0x5) // goerli
    {
        alert('switch to goerli asshole')
        return;
    }
    console.log('gamered')

    var addr = localStorage.getItem('web3addr');

    window.web3 = new Web3(window.ethereum);
    window.cp.pisscoin = new window.web3.eth.Contract(contractInterface,
        contractAddress,
        {
            gasPrice: '20000000000'
        })

    if (addr)
    {
        window.cp.eth.accounts = [addr];
        window.cp.pisscoin.defaultAccount = addr;
        js.setAddrText(addr);
    }
}

js.connectMetamask = async function()
{
    let mmResponse = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(mmResponse);
    window.cp.eth.accounts = [mmResponse[0]];
    window.cp.pisscoin.defaultAccount = cp.eth.accounts[0];
    localStorage.setItem('web3addr', window.cp.eth.accounts[0]);
    js.setAddrText(mmResponse[0]);
}

js.test = async function()
{
    var piss = await js.getpiss()
    alert(`you hold ${piss} PISS`)
}

js.getpiss = async function()
{
    var txn = window.cp.pisscoin.methods.balanceOf(cp.eth.accounts[0]);
    var res = await txn.call({
        from: cp.eth.accounts[0],
        gasPrice: "100000"
    });
    return (res / Math.pow(10, 18));
}

js.mintpiss = async function()
{
    var txn = window.cp.pisscoin.methods.makeMeSomePisscoin()
    await txn.send({
        from: cp.eth.accounts[0],
        //gas: eth.gwei(20),
        value: eth.ether(0.001)
    })
    
    var pissamount = await js.getpiss()
    alert(`congratulations you now hold ${pissamount} PISS`)
}

document.onreadystatechange = () =>
{
    if (document.readyState == 'complete')
        js.onload();
}