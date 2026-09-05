import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable/index";

export function GoogleButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });

    if (result.error) {
      setLoading(false);
      toast.error("Google sign-in failed", { description: "Please try again or use your credentials." });
      return;
    }
    if (result.redirected) return;
    window.location.assign("/console");
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={signIn}
      disabled={loading}
      className="w-full border-border bg-secondary/60 hover:bg-secondary"
    >
      <GoogleMark />
      {loading ? "Connecting…" : label}
    </Button>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-4 w-4">
      <path
        fill="#FFC107"
        d="M43.6 20.1H24v7.9h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.6-5.6C33.9 6.1 29.2 4 24 4 13 4 4 13 4 24s9 20 20 20 19.4-9 19.4-20c0-1.3-.2-2.6-.8-3.9z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.1 7.9 3l5.6-5.6C33.9 6.1 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.2-5.2C29.2 34.8 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-8l-6.6 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H24v7.9h11.3c-.8 2.2-2.2 4.1-4.2 5.6l6.2 5.2C40.9 35.5 44 30.3 44 24c0-1.3-.2-2.6-.4-3.9z"
      />
    </svg>
  );
}
