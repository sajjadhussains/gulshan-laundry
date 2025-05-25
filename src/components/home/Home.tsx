import HeroSection from '../heroSection/HeroSection'
import AboutCompany from '../aboutCompany/AboutCompany'
import PromiseSection from '../promise/PromiseSection'
import ServiceSection from '../serviceSection/ServiceSection'
import CorporateDeals from '../corporateDeals/CorporateDeals'
import LaundryServiceForm from '../laundryServiceForm/LaundryServiceForm'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutCompany />
      <PromiseSection />
      <ServiceSection />
      <LaundryServiceForm />
      <CorporateDeals />
    </>
  )
}
