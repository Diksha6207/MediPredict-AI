import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/home.css";

function Home() {
  const stats = [
    {
      number: "250+",
      title: "Diseases",
    },
    {
      number: "130+",
      title: "Symptoms",
    },
    {
      number: "500+",
      title: "Doctors",
    },
    {
      number: "10K+",
      title: "Predictions",
    },
  ];

  const features = [
    {
      icon: "🧠",
      title: "AI Disease Prediction",
      description:
        "Advanced Machine Learning model predicts diseases from symptoms with high accuracy.",
    },

    {
      icon: "👨‍⚕️",
      title: "Doctor Recommendation",
      description:
        "Get specialist doctors based on your predicted disease and location.",
    },

    {
      icon: "📊",
      title: "Prediction Reports",
      description:
        "Generate detailed prediction reports for future consultations.",
    },

    {
      icon: "📜",
      title: "Prediction History",
      description:
        "Securely save and review all your previous healthcare predictions.",
    },

    {
      icon: "🔐",
      title: "Secure Authentication",
      description:
        "JWT based secure authentication keeps patient data protected.",
    },

    {
      icon: "⚡",
      title: "Fast Analysis",
      description:
        "Instant disease prediction powered by AI and Flask backend.",
    },
  ];

  return (
    <>

      {/* HERO */}

      <section className="hero">

        <div className="hero-container">

          <div className="hero-left">

            <img
              src={logo}
              alt="MediPredict AI"
              className="hero-logo"
            />

            <span className="hero-tag">
              AI Powered Healthcare Platform
            </span>

            <h1>
              Predict Diseases
              <br />
              With Artificial Intelligence
            </h1>

            <p>
              MediPredict AI is an intelligent healthcare platform
              that predicts diseases using Artificial Intelligence
              and Machine Learning while recommending specialist
              doctors according to patient symptoms.
            </p>

            <div className="hero-buttons">

              <Link
                to="/predict"
                className="primary-btn"
              >
                Predict Disease
              </Link>

              <Link
                to="/about"
                className="secondary-btn"
              >
                Learn More
              </Link>

            </div>

          </div>

          <div className="hero-right">

            <div className="hero-card">

              <h2>MediPredict AI</h2>

              <p>
                AI Assisted Healthcare
              </p>

              <ul>

                <li>✔ Machine Learning Prediction</li>

                <li>✔ Real Doctor Recommendation</li>

                <li>✔ Medical Reports</li>

                <li>✔ Prediction History</li>

                <li>✔ Secure Login</li>

                <li>✔ Healthcare Dashboard</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats">

        <div className="stats-container">

          {stats.map((item) => (

            <div
              key={item.title}
              className="stat-card"
            >

              <h2>{item.number}</h2>

              <p>{item.title}</p>

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        <div className="section-title">

          <h2>
            Platform Features
          </h2>

          <p>
            Modern AI Healthcare Platform
            with intelligent disease prediction
            and specialist doctor recommendation.
          </p>

        </div>

        <div className="feature-grid">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="feature-card"
            >

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </section>

            {/* HOW IT WORKS */}

      <section className="workflow">

        <div className="section-title">

          <h2>
            How MediPredict AI Works
          </h2>

          <p>
            Get intelligent healthcare assistance in four simple
            steps using Artificial Intelligence and Machine Learning.
          </p>

        </div>

        <div className="workflow-grid">

          <div className="workflow-card">

            <span>01</span>

            <h3>Select Symptoms</h3>

            <p>
              Choose the symptoms you are experiencing from the
              smart symptom selector.
            </p>

          </div>

          <div className="workflow-card">

            <span>02</span>

            <h3>AI Analysis</h3>

            <p>
              Our Machine Learning model analyses symptom
              combinations and predicts possible diseases.
            </p>

          </div>

          <div className="workflow-card">

            <span>03</span>

            <h3>Doctor Recommendation</h3>

            <p>
              Based on the predicted disease, specialist doctors
              are recommended for consultation.
            </p>

          </div>

          <div className="workflow-card">

            <span>04</span>

            <h3>Download Report</h3>

            <p>
              Save your prediction history and download your
              medical report anytime.
            </p>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="why">

        <div className="why-container">

          <div className="why-left">

            <h2>
              Why Choose
              <br />
              MediPredict AI?
            </h2>

            <p>

              MediPredict AI combines the power of
              Artificial Intelligence, Machine Learning,
              MERN Stack and Healthcare datasets
              to provide fast, secure and reliable
              disease prediction.

            </p>

            <ul>

              <li>✔ AI Powered Prediction</li>

              <li>✔ Real Doctor Recommendation</li>

              <li>✔ Healthcare Reports</li>

              <li>✔ Patient History</li>

              <li>✔ Secure Authentication</li>

              <li>✔ Modern Dashboard</li>

              <li>✔ Easy To Use Interface</li>

            </ul>

          </div>

          <div className="why-right">

            <div className="why-box">

              <h3>98%</h3>

              <p>
                AI Prediction Accuracy
              </p>

            </div>

            <div className="why-box">

              <h3>500+</h3>

              <p>
                Specialist Doctors
              </p>

            </div>

            <div className="why-box">

              <h3>250+</h3>

              <p>
                Diseases Covered
              </p>

            </div>

            <div className="why-box">

              <h3>24/7</h3>

              <p>
                Smart Healthcare
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* AI WORKFLOW */}

      <section className="ai-workflow">

        <div className="section-title">

          <h2>
            AI Prediction Flow
          </h2>

          <p>
            Complete workflow of MediPredict AI
          </p>

        </div>

        <div className="flow">

          <div className="flow-card">
            🩺
            <h3>Symptoms</h3>
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="flow-card">
            🤖
            <h3>ML Model</h3>
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="flow-card">
            📋
            <h3>Disease</h3>
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="flow-card">
            👨‍⚕️
            <h3>Doctor</h3>
          </div>

          <div className="flow-arrow">
            →
          </div>

          <div className="flow-card">
            📄
            <h3>Report</h3>
          </div>

        </div>

      </section>

            {/* TESTIMONIALS */}

      <section className="testimonials">

        <div className="section-title">

          <h2>
            What Our Users Say
          </h2>

          <p>
            Trusted by students, professionals and healthcare users.
          </p>

        </div>

        <div className="testimonial-grid">

          <div className="testimonial-card">

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              MediPredict AI provides a clean interface and
              quick disease prediction. It helped me understand
              my symptoms before visiting a doctor.
            </p>

            <h3>Rahul Sharma</h3>

            <span>Patient</span>

          </div>

          <div className="testimonial-card">

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              The doctor recommendation system is really useful.
              It suggested the correct specialist based on my
              symptoms.
            </p>

            <h3>Priya Verma</h3>

            <span>Working Professional</span>

          </div>

          <div className="testimonial-card">

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p>
              Beautiful interface, fast prediction and secure
              patient history. Amazing healthcare platform.
            </p>

            <h3>Aman Gupta</h3>

            <span>Student</span>

          </div>

        </div>

      </section>

      {/* HEALTHCARE */}

      <section className="healthcare">

        <div className="healthcare-left">

          <h2>
            Smart Healthcare
            <br />
            Powered By AI
          </h2>

          <p>

            Artificial Intelligence and Machine Learning
            can assist doctors by analysing symptom
            patterns faster and recommending the right
            specialist for consultation.

          </p>

          <ul>

            <li>✔ AI Disease Prediction</li>

            <li>✔ Early Health Awareness</li>

            <li>✔ Doctor Recommendation</li>

            <li>✔ Secure Reports</li>

            <li>✔ Patient Dashboard</li>

          </ul>

        </div>

        <div className="healthcare-right">

          <div className="health-card">

            <h3>98%</h3>

            <span>
              Accuracy
            </span>

          </div>

          <div className="health-card">

            <h3>250+</h3>

            <span>
              Diseases
            </span>

          </div>

          <div className="health-card">

            <h3>500+</h3>

            <span>
              Doctors
            </span>

          </div>

          <div className="health-card">

            <h3>10000+</h3>

            <span>
              Predictions
            </span>

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="faq">

        <div className="section-title">

          <h2>
            Frequently Asked Questions
          </h2>

        </div>

        <div className="faq-container">

          <div className="faq-card">

            <h3>
              Is MediPredict AI a replacement for doctors?
            </h3>

            <p>
              No. It only assists patients using AI. Always
              consult a qualified medical professional.
            </p>

          </div>

          <div className="faq-card">

            <h3>
              Is my health data secure?
            </h3>

            <p>
              Yes. Patient information is protected using
              authentication and secure database storage.
            </p>

          </div>

          <div className="faq-card">

            <h3>
              Does AI always predict correctly?
            </h3>

            <p>
              AI improves healthcare assistance but cannot
              replace medical diagnosis by licensed doctors.
            </p>

          </div>

        </div>

      </section>

      {/* DISCLAIMER */}

      <section className="disclaimer">

        <div className="disclaimer-box">

          <h2>
            Medical Disclaimer
          </h2>

          <p>

            MediPredict AI is designed for educational
            and healthcare assistance purposes only.
            Predictions generated by AI are not final
            medical diagnoses.

            Please consult a qualified healthcare
            professional before taking medicines or
            making treatment decisions.

          </p>

        </div>

      </section>

      {/* CALL TO ACTION */}

      <section className="cta">

        <h2>
          Ready To Predict Your Disease?
        </h2>

        <p>

          Start your AI healthcare journey today and
          receive intelligent disease prediction along
          with specialist doctor recommendations.

        </p>

        <div className="cta-buttons">

          <Link
            to="/predict"
            className="primary-btn"
          >
            Start Prediction
          </Link>

          <Link
            to="/register"
            className="secondary-btn"
          >
            Create Free Account
          </Link>

        </div>

      </section>

            {/* NEWSLETTER */}

      <section className="newsletter">

        <div className="newsletter-container">

          <h2>
            Stay Updated With MediPredict AI
          </h2>

          <p>
            Subscribe to receive healthcare tips,
            AI updates and future platform features.
          </p>

          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button
              type="submit"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>

      {/* OUR MISSION */}

      <section className="mission">

        <div className="mission-container">

          <div>

            <h2>
              Our Mission
            </h2>

            <p>

              Our mission is to make healthcare
              accessible through Artificial Intelligence,
              enabling users to understand possible
              diseases quickly while encouraging timely
              consultation with qualified doctors.

            </p>

          </div>

          <div>

            <h2>
              Our Vision
            </h2>

            <p>

              We envision MediPredict AI becoming a
              trusted AI healthcare assistant that helps
              millions of people make informed healthcare
              decisions worldwide.

            </p>

          </div>

        </div>

      </section>

      {/* TECHNOLOGIES */}

      <section className="technology">

        <div className="section-title">

          <h2>
            Technologies Used
          </h2>

          <p>
            Modern technologies powering MediPredict AI
          </p>

        </div>

        <div className="tech-grid">

          <div className="tech-card">
            ⚛️
            <h3>React</h3>
          </div>

          <div className="tech-card">
            🟢
            <h3>Node.js</h3>
          </div>

          <div className="tech-card">
            🚀
            <h3>Express</h3>
          </div>

          <div className="tech-card">
            🍃
            <h3>MongoDB</h3>
          </div>

          <div className="tech-card">
            🤖
            <h3>Machine Learning</h3>
          </div>

          <div className="tech-card">
            🐍
            <h3>Flask API</h3>
          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="final-cta">

        <div className="final-cta-container">

          <h2>
            Your Health Comes First
          </h2>

          <p>

            Experience AI-powered disease prediction,
            specialist doctor recommendation,
            healthcare reports and secure patient
            history—all in one platform.

          </p>

          <Link
            to="/predict"
            className="final-btn"
          >
            Predict Now →
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;