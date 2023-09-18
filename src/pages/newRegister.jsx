
import CustomMetadata from '@/components/CustomMetadata'
import MainLayout from '@/components/MainLayout'
import NavBar from '@/components/NavBar'
import RegistrationForm from '@/components/RegistrationForm'

const newRegister = () => {
  return (
    <MainLayout>
      <CustomMetadata />
      <NavBar/>
    <RegistrationForm/>
  
    </MainLayout>
  )
}

export default newRegister