import Link from 'next/link'

const DisclaimerPage = () => {
  return (
    <div className="container mx-auto p-8 mt-20">
      <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
      <p className="text-lg mb-4">
        This application is for educational purposes only and simulates social
        engineering scenarios. It does not engage in real-world hacking or
        phishing activities.
      </p>
      <p className="text-lg mb-4">
        The information provided in this application is for general knowledge
        and informational purposes only. It does not constitute professional
        advice.
      </p>
      <p className="text-lg mb-4">
        We strive for accuracy, but we cannot guarantee that the information is
        always up-to-date or error-free. We are not responsible for any actions
        or decisions taken based on the information provided in this
        application.
      </p>
      <p className="text-lg mb-4">
        By using this application, you acknowledge and agree to these terms and
        conditions.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

export default DisclaimerPage
