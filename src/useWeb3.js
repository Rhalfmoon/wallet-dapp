import { useEffect, useState } from 'react';
import Web3 from 'web3';

function useWeb3() {
    const [account, setAccount] = useState(); 
    const [web3, setWeb3] = useState(); 

    const getChainId = async () => {
        const chainId = await window.ethereum.request({
            method : 'eth_chainId',
            params : [],
        }); // 메타마스크에게 cahinID 요청
        console.log(chainId);
        return chainId;
    }

    const getRequestAccounts = async () => {
        const account = await window.ethereum.request({
            method : 'eth_requestAccounts',
            params : [],
        }); // 메타마스크에 연결되어 있는 네트워크 계정 요청
        console.log(account); 
        return account;
    };

    const addNetwork = async (chainId) => {
        const network = {
            chainId: chainId,
            chainName: 'Gnosis',
            rpcUrls: ["https://rpc.gnosischain.com"],
            nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: undefined,
            },
        }

        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
        })
    };

    useEffect(() => {
        async function init (){
            try {
                const targetChainId = ' '
                const chainId = await getChainId() 
                if (targetChainId !== chainId) {
                    // network를 추가하는 코드 작성
                    addNetwork(targetChainId);
                }
                const [account] = await getRequestAccounts();

                const web3 = new Web3(window.ethereum); // 요청을 메타마스크에 바로 보내줌
                setAccount(account);
                setWeb3(web3);
            } catch (e) {
                console.error(e.message);
            }
        }

        if (window.ethereum) {
            init()
        }
    }, [])

    return [account, web3]
}

export default useWeb3