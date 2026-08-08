import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/about.css";

function About() {
  return (
    <>

      {/* HERO */}

      <section className="about-hero">

        <div className="about-container">

          <div className="about-left">

            <img
              src={logo}
              alt="MediPredict AI"
              className="about-logo"
            />

            <span className="about-tag">
              AI Powered Healthcare Platform
            </span>

            <h1>
              About
              <br />
              MediPredict AI
            </h1>

            <p>

              MediPredict AI is an intelligent healthcare
              platform that combines Artificial Intelligence,
              Machine Learning and the MERN Stack to help
              users understand possible diseases based on
              their symptoms.

              Our goal is to provide quick healthcare
              assistance while encouraging users to consult
              qualified medical professionals.

            </p>

            <div className="about-buttons">

              <Link
                to="/predict"
                className="primary-btn"
              >
                Try Prediction
              </Link>

              <Link
                to="/contact"
                className="secondary-btn"
              >
                Contact Us
              </Link>

            </div>

          </div>

          <div className="about-right">

            <div className="about-card">

              <h2>
                Why MediPredict AI?
              </h2>

              <ul>

                <li>
                  ✔ AI Based Disease Prediction
                </li>

                <li>
                  ✔ Real Doctor Recommendation
                </li>

                <li>
                  ✔ Prediction History
                </li>

                <li>
                  ✔ PDF Medical Reports
                </li>

                <li>
                  ✔ Secure Authentication
                </li>

                <li>
                  ✔ Healthcare Dashboard
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* OUR STORY */}

      <section className="story">

        <div className="section-title">

          <h2>
            Our Story
          </h2>

          <p>

            Healthcare information should be available
            quickly and easily.

          </p>

        </div>

        <div className="story-container">

          <p>

            MediPredict AI was created to bridge the gap
            between Artificial Intelligence and healthcare.

            Many people ignore symptoms because they
            don't know which specialist to consult.

            Our platform analyses symptoms,
            predicts possible diseases,
            recommends specialist doctors,
            stores patient history
            and generates healthcare reports.

            MediPredict AI is not a replacement for doctors.

            Instead,
            it works as a smart healthcare assistant
            that helps patients make better decisions
            before visiting hospitals.

          </p>

        </div>

      </section>

      {/* MISSION */}

      <section className="mission-section">

        <div className="mission-grid">

          <div className="mission-card">

            <h2>
              Our Mission
            </h2>

            <p>

              To provide intelligent healthcare
              assistance using Artificial Intelligence
              and Machine Learning while promoting
              responsible medical consultation.

            </p>

          </div>

          <div className="mission-card">

            <h2>
              Our Vision
            </h2>

            <p>

              To become one of the world's trusted
              AI healthcare platforms helping
              millions of users make informed
              healthcare decisions.

            </p>

          </div>

        </div>

      </section>

            {/* FEATURES */}

      <section className="about-features">

        <div className="section-title">

          <h2>
            Platform Features
          </h2>

          <p>
            Everything you need in one AI healthcare platform.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <span>🧠</span>
            <h3>AI Disease Prediction</h3>
            <p>
              Predict possible diseases using Machine Learning
              based on selected symptoms.
            </p>
          </div>

          <div className="feature-card">
            <span>👨‍⚕️</span>
            <h3>Doctor Recommendation</h3>
            <p>
              Get specialist doctor recommendations according
              to the predicted disease.
            </p>
          </div>

          <div className="feature-card">
            <span>📄</span>
            <h3>Medical Reports</h3>
            <p>
              Generate downloadable healthcare reports after
              every prediction.
            </p>
          </div>

          <div className="feature-card">
            <span>📊</span>
            <h3>Prediction History</h3>
            <p>
              View previous predictions anytime from your
              dashboard.
            </p>
          </div>

          <div className="feature-card">
            <span>🔒</span>
            <h3>Secure Authentication</h3>
            <p>
              JWT authentication keeps every patient account
              secure.
            </p>
          </div>

          <div className="feature-card">
            <span>⚡</span>
            <h3>Fast Prediction</h3>
            <p>
              Receive AI-powered prediction results in just a
              few seconds.
            </p>
          </div>

        </div>

      </section>

      {/* TECHNOLOGIES */}

      <section className="technology-section">

        <div className="section-title">

          <h2>
            Technologies Used
          </h2>

        </div>

        <div className="technology-grid">

          <div className="technology-card">⚛️ React</div>

          <div className="technology-card">🟢 Node.js</div>

          <div className="technology-card">🚀 Express</div>

          <div className="technology-card">🍃 MongoDB</div>

          <div className="technology-card">🤖 Machine Learning</div>

          <div className="technology-card">🐍 Flask API</div>

          <div className="technology-card">🔐 JWT</div>

          <div className="technology-card">☁️ Cloud Deployment</div>

        </div>

      </section>

      {/* DISCLAIMER */}

      <section className="about-disclaimer">

        <div className="disclaimer-box">

          <h2>
            Medical Disclaimer
          </h2>

          <p>

            MediPredict AI is an AI-assisted healthcare platform
            developed for educational and healthcare support
            purposes.

            Disease predictions generated by the platform
            should never be considered a final medical diagnosis.

            Always consult a qualified doctor before taking
            medicines or making healthcare decisions.

          </p>

        </div>

      </section>

      {/* CTA */}

      <section className="about-cta">

        <h2>
          Experience Smart Healthcare Today
        </h2>

        <p>

          Predict diseases, consult specialist doctors,
          download reports and manage your healthcare
          history in one secure platform.

        </p>

        <div className="about-buttons">

          <Link
            to="/predict"
            className="primary-btn"
          >
            Predict Disease
          </Link>

          <Link
            to="/"
            className="secondary-btn"
          >
            ← Back To Home
          </Link>

        </div>

      </section>

    </>
  );
}

export default About;