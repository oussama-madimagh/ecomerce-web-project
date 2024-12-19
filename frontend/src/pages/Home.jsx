import BestSeller from "../components/BestSeller"
import LatestCollection from "../components/LatestCollection"
import Model from "../components/Model.jsx"
import SubscribeBox from "../components/subscribeBox"


const Home = () => {
  return (
    <div>
      <Model />
      <LatestCollection/>
      <BestSeller/>
      <SubscribeBox/>
    </div>
  )
}

export default Home

