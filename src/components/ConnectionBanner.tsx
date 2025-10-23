import React from 'react';
import { AlertTriangle, CheckCircle2, Loader2, PlugZap } from 'lucide-react';
import { isSupabaseConfigured, pingSupabase } from '../lib/supabase';

const statusStyles: Record<string, string> = {
  checking: 'border-sky-400/40 bg-sky-500/10 text-sky-100',
  connected: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100',
  missing: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
  error: 'border-rose-400/40 bg-rose-500/10 text-rose-100',
};

type BannerState = {
  status: 'checking' | 'connected' | 'missing' | 'error';
  message: string;
};

interface ConnectionBannerProps {
  className?: string;
}

export function ConnectionBanner({ className }: ConnectionBannerProps) {
  const [state, setState] = React.useState<BannerState>(() =>
    isSupabaseConfigured()
      ? { status: 'checking', message: 'Checking Supabase connectivity…' }
      : {
          status: 'missing',
          message:
            'Supabase credentials are not configured. The chat will only persist data in-memory.',
        }
  );
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  const runCheck = React.useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setState({
        status: 'missing',
        message:
          'Supabase credentials are not configured. The chat will only persist data in-memory.',
      });
      setLastUpdated(new Date());
      return;
    }

    setState({ status: 'checking', message: 'Checking Supabase connectivity…' });

    const result = await pingSupabase();

    setState({ status: result.status === 'missing' ? 'missing' : result.status, message: result.message });
    setLastUpdated(new Date());
  }, []);

  React.useEffect(() => {
    runCheck();
  }, [runCheck]);

  const icon = {
    checking: <Loader2 className="h-4 w-4 animate-spin" />,
    connected: <CheckCircle2 className="h-4 w-4" />,
    missing: <AlertTriangle className="h-4 w-4" />, 
    error: <AlertTriangle className="h-4 w-4" />,
  }[state.status];

  return (
    <div
      className={`flex w-full flex-col gap-2 rounded-2xl border px-4 py-3 text-sm shadow-lg shadow-black/20 backdrop-blur ${
        statusStyles[state.status]
      } ${className ?? ''}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">Supabase status: {state.status}</span>
      </div>
      <p className="text-xs opacity-80">{state.message}</p>
      <div className="flex items-center justify-between text-xs opacity-70">
        <button
          type="button"
          onClick={runCheck}
          className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-medium uppercase tracking-wide transition hover:border-white/40 hover:bg-white/20"
        >
          <PlugZap className="h-3 w-3" />
          Re-run check
        </button>
        {lastUpdated && <span>Last checked {lastUpdated.toLocaleTimeString()}</span>}
      </div>
    </div>
  );
}
