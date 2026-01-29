import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PageErrorPropsType = {
  error: string | null | boolean;
  errorTitle: string | null;
  errorDescription?: string | null;
  redirectTo: string | null;
  buttonContent: string;
};

const PageError = ({
  error,
  errorTitle,
  errorDescription,
  redirectTo,
  buttonContent,
}: PageErrorPropsType) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 mb-4">
        <AlertCircle className="w-10 h-10 text-error" />
      </div>
      <h2 className="text-2xl font-bold mb-3">{errorTitle}</h2>
      <p className="text-base-content/70 mb-6">{error || errorDescription}</p>
      <button
        onClick={() => navigate(`${redirectTo}`)}
        className="btn btn-primary gap-2"
      >
        <ArrowLeft size={18} />
        {buttonContent}
      </button>
    </div>
  );
};

export default PageError;
