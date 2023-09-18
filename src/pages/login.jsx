import CustomMetadata from "@/components/CustomMetadata"
import MainLayout from "@/components/MainLayout"
import NavBar from "@/components/NavBar"
import Login from"@/components/Login"

const Load = () => {
  return (
    <MainLayout>
      <CustomMetadata/>
      <Login/>
    </MainLayout>
  )
}

export default Load