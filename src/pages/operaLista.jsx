import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import OperaLista from "@/components/prestatario/OperaLista"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <NavBar/>
    <OperaLista/>
    </MainLayout>
  )
}

export default Load