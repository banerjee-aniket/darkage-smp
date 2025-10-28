import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

interface ServerStatusData {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version: {
    name: string;
  };
  motd: {
    raw: string;
  };
  fetched_at: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    online?: boolean;
    players?: {
      online?: number;
      max?: number;
    };
    version?: {
      name_clean?: string;
      name?: string;
    };
    motd?: {
      clean?: string[];
      raw?: string[];
    };
  };
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
      const FMCS_TOKEN = import.meta.env.VITE_FMCS_TOKEN;

      if (!RAPIDAPI_KEY || !FMCS_TOKEN) {
        console.error('API credentials not found');
        toast.error('API credentials not configured');
        setStatus(null);
        return;
      }

      const response = await fetch(
        'https://freemcserver.p.rapidapi.com/v4/server/1795866/ping',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': 'freemcserver.p.rapidapi.com',
            'User-Agent': 'FMCS-USER-2502975',
            'X-FMCS-Token': FMCS_TOKEN,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const api: ApiResponse = await response.json();

      // Ensure structure is valid
      if (!api.success || !api.data) {
        throw new Error('Invalid API structure');
      }

      const payload = api.data;

      // Log API response for debugging
      console.log('Fetched payload:', payload);

      const simplifiedData: ServerStatusData = {
        online: !!payload.online,
        players: {
          online: payload.players?.online ?? 0,
          max: payload.players?.max ?? 0,
        },
        version: {
          name:
            payload.version?.name_clean ??
            payload.version?.name ??
            'Unknown',
        },
        motd: {
          raw:
            payload.motd?.clean?.[0] ??
            payload.motd?.raw?.[0] ??
            'Welcome to DarkAge SMP',
        },
        fetched_at: new Date().toISOString(),
      };

      setStatus(simplifiedData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch server status:', error);
      toast.error('Failed to fetch server status');
      setStatus(null); // reset state on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  const getRelativeTime = () => {
    if (!lastUpdated) return 'Never';
    const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <Card className="p-6 bg-card border-border transition-all duration-300 hover:shadow-glow-primary">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          {status?.online ? (
            <Wifi className="text-accent" />
          ) : (
            <WifiOff className="text-destructive" />
          )}
          Server Status
        </h2>
        <Button
          onClick={fetchStatus}
          disabled={loading}
          size="sm"
          variant="outline"
          className="hover:shadow-glow-primary transition-all"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              status?.online
                ? 'bg-accent/20 text-accent shadow-glow-accent'
                : 'bg-destructive/20 text-destructive'
            }`}
          >
            {status?.online ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        {status && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-muted-foreground text-sm">Players</div>
                <div className="text-2xl font-bold text-primary">
                  {status.players.online}/{status.players.max}
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-muted-foreground text-sm">Version</div>
                <div className="text-xl font-bold text-secondary">
                  {status.version.name}
                </div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <div className="text-muted-foreground text-sm mb-1">MOTD</div>
              <div className="text-foreground font-mono text-sm">
                {status.motd.raw}
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-right">
              Updated {getRelativeTime()}
            </div>
          </>
        )}

        {!status && !loading && (
          <div className="text-center text-muted-foreground py-4">
            Error fetching server data. You can still renew via the{' '}
            <a
              href="https://freemcserver.net/server/1795866"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              public page
            </a>
            .
          </div>
        )}
      </div>
    </Card>
  );
}
