function VisualTesting() {

  const failures = [

    {
      name: 'Login Test Failure',
      image: '/screenshots/login-failure.png',
      reason: 'Login button selector failed'
    }

  ]

  return (

    <div>

      <h1 className="page-title">
        📸 Test Failure Screenshots
      </h1>

      <div className="failure-grid">

        {
          failures.map((item, index) => (

            <div
              className="failure-card"
              key={index}
            >

              <img
                src={item.image}
                alt="failure"
              />

              <h2>{item.name}</h2>

              <p>{item.reason}</p>

            </div>

          ))
        }

      </div>

    </div>

  )

}

export default VisualTesting