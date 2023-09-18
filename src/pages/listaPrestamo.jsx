import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import ListaPrestamo from "@/components/prestamista/PrestamosList"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <NavBar/>
    <ListaPrestamo/>
    </MainLayout>
  )
}

export default Load