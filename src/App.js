import useWeb3 from './useWeb3.js'
import { useState, useEffect } from 'react'

function App() {
  const [account, web3] = useWeb3()
  const [isLogin, setIsLogin] = useState(false)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    async function init() {
      const balance = await web3?.eth.getBalance(account) 
      setBalance(balance)
      console.log("balance get");
      console.log(balance);
    }
    if (account) {
      setIsLogin(true)
      init()
      console.log("balance get start");

    }  
  }, [account])

  if (!isLogin) return <div>메타마스크 로그인 이후 사용해주세요.</div>
  return (
    <div>
      <div>
        <h2>계정 : {account}</h2>
        <div>Balance : {balance} ETH</div>
      </div>
      <div>
          <input type="text" id="recived" placeholder="받을 계정" />
          <input type="number" id="amount" placeholder="보낼 금액" />
      </div>
    </div>
  )
}

export default App