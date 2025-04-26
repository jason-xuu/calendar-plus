import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle magic link session on arrival
  useEffect(() => {
    const handleMagicLinkLogin = async () => {
      const hash = window.location.hash;

      if (hash.includes("error")) {
        const params = new URLSearchParams(hash.replace("#", "?"));
        const errorDescription = params.get("error_description");
        setMessage(`⚠️ ${decodeURIComponent(errorDescription || "Something went wrong.")}`);
        return;
      }

      // ✅ Try restoring session if access_token exists
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/calendar");
      }
    };

    handleMagicLinkLogin();
  }, [navigate]);

  // ✅ Send magic link
  const handleLogin = async () => {
    setIsSending(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:8080/login", // 👈 redirects back to login page
      },
    });

    if (error) {
      console.error("Login failed:", error.message);
      setMessage("❌ Failed to send login link. Please try again.");
    } else {
      setMessage("✅ Check your email for the magic login link.");
    }

    setIsSending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-muted">
      <h2 className="text-3xl font-bold mb-2">Login</h2>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2 rounded w-72"
      />
      <button
        onClick={handleLogin}
        disabled={isSending || !email.includes("@")}
        className={`px-4 py-2 w-72 rounded text-white ${
          isSending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSending ? "Sending..." : "Send Magic Link"}
      </button>
      {message && <p className="text-sm text-center text-gray-700 max-w-xs">{message}</p>}
    </div>
  );
};

export default Login;
