import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import PerfilEdit from "@/components/PerfilEdit"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <NavBar/>
    <PerfilEdit/>
    </MainLayout>
  )
}

export default Load