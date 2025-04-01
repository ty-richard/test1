import HomeDescriptionItems from './descriptionItems/homedescriptionItems'
import HomeViewAllItem from './homeViewAllItem'
import { dm_sans } from '@/app/fonts';

const HomeSearchBox = () => {
  return (
    <div className="w-screen min-h-[600px] sm:h-[975px] flex items-center justify-center -ml-[max(0px,calc((100vw-100%)/2))] mt-64 sm:mt-40">
      <div className="flex flex-col items-center px-4 sm:px-8">
        <h2 className={`text-center font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tighter mb-8 sm:mb-12 text-navy ${dm_sans.className}`}>
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