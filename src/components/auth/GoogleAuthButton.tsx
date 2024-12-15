import { Button } from '@/components/ui/Button';
import { GOOGLE_OAUTH_CONFIG } from '@/lib/config/constants';

interface GoogleAuthButtonProps {
  className?: string;
}

export function GoogleAuthButton({ className }: GoogleAuthButtonProps) {
  const handleGoogleAuth = () => {
    const params = new URLSearchParams({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent'
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoogleAuth}
      className={className}
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-4 h-4 mr-2"
      />
      Continue with Google
    </Button>
  );
}