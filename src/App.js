import useWeb3 from './useWeb3'
import { useState, useEffect } from 'react'

function App() {
  const [account, web3] = useWeb3()
  const [isLogin, setIsLogin] = useState(false)
  const [balance, setBalance] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await web3.eth.sendTransaction({
      from: account,
      to: e.target.recived.value,
      value: web3.utils.toWei(e.target.amount.value, 'ether'),
    })
  }

  useEffect(() => {
    async function init() {
      const balance = await web3?.eth.getBalance(account) 
      setBalance(balance) 
    }
    if (account) {
      setIsLogin(true)
      init()
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
        <form onSubmit={handleSubmit}>
          <input type="text" id="recived" placeholder="받을 계정" />
          <input type="number" id="amount" placeholder="보낼 금액" />
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  )
}

export default App