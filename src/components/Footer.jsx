import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="text-muted py-5 position-relative bottom-0">
      <div className="container">
      {/* <p className="float-end mb-1">
        <Link to="#">Back to top</Link>
      </p> */}
      <p className="mb-1">ecart is © 2024 <Link to="mailto:arulmuruganarjun14@gmail.com" target="_black">Be connected</Link> Making shopping easier - ecart</p>
    </div>
  </footer>
    )
}


export default Footer