
import CustomMetadata from '@/components/CustomMetadata'
import EmailSafetyModal from '@/components/EmailSafetyModal'
import Footer from '@/components/Footer'
import Login from '@/components/Login'
import MainLayout from '@/components/MainLayout'
import NavBar from '@/components/NavBar'


const Home = () => {
  return (
    <MainLayout>
      <CustomMetadata />
      <NavBar />
      <Login/>
      <Footer/>
     <EmailSafetyModal/>
    </MainLayout>
  )
}

export default Home