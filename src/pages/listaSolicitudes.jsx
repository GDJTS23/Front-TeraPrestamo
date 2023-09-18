import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import ListaSolicitudes from "@/components/prestamista/SolicitudesList"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <NavBar/>
    <ListaSolicitudes/>
    </MainLayout>
  )
}

export default Load