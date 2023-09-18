import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import PrestatarioDashboard from "@/components/PrestatarioDashboard"
import PrestaOferta from "@/components/prestamista/PrestaOferta"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
    <PrestaOferta/>
    </MainLayout>
  )
}

export default Load