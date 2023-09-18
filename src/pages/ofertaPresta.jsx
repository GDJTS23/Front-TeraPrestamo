import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import OfertaPresta from "@/components/prestatario/OfertaPresta"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <NavBar/>
    <OfertaPresta/>
    </MainLayout>
  )
}

export default Load