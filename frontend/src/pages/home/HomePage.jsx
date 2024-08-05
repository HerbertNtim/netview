import Footer from "../../components/Footer"
import AuthScreen from "./AuthScreen"
import HomeScreen from "./HomeScreen"

const HomePage = () => {
  const user = false
  return (
    <main className="hero-bg h-screen">
      {user ? <HomeScreen /> : <AuthScreen /> }
      <Footer />
    </main>
  )
}

export default HomePage
