import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import DocumentCarga from "@/components/DocumentCarga"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <NavBar/>
    <DocumentCarga/>
    </MainLayout>
  )
}

export default Load