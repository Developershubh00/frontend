import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NeetpgPredictorCTA.css";

function NeetpgPredictorCTA() {
  const navigate = useNavigate();

  return (
    <section className="pg-predictor-cta">
      <div className="pg-predictor-cta-glow pg-predictor-cta-glow-one"></div>
      <div className="pg-predictor-cta-glow pg-predictor-cta-glow-two"></div>

      <div className="pg-predictor-cta-content">
        <div className="pg-predictor-cta-icon">
          <BarChart3 size={24} />
        </div>

        <div className="pg-predictor-cta-text">
          <div className="pg-predictor-cta-badge">
            <Sparkles size={14} />
            NEET PG Predictor
          </div>

          <h2>Not sure which college you can get?</h2>

          <p>
            Enter your NEET PG rank, category and quota to explore colleges
            based on previous year allotment data.
          </p>
        </div>

        <button
          className="pg-predictor-cta-button"
          onClick={() => navigate("/predictor/neet-pg")}
        >
          Predict My College
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default NeetpgPredictorCTA;
