import HomeDescriptionItems from './homedescriptionItems'
import HomeViewAllItem from './homeViewAllItem'

const HomeSearchBox = () => {
  return (
    <div className="w-screen h-[975px] flex items-center justify-center bg-gray-50 -ml-[max(0px,calc((100vw-100%)/2))] mt-40">
      <div className="flex flex-col items-center">
        <h2 className="text-center font-bold text-7xl tracking-tighter mb-12">
          find what{' '}
          <br />
          matters to you
        </h2>
        <HomeDescriptionItems />
        <HomeViewAllItem />
      </div>
    </div>
  )
}

export default HomeSearchBox