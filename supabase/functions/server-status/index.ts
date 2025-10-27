import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    
    if (!RAPIDAPI_KEY) {
      console.error('RAPIDAPI_KEY not found in environment');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Fetching server status from RapidAPI...');
    
    const response = await fetch(
      'https://freemcserver.p.rapidapi.com/v4/server/1795866/ping',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'freemcserver.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      console.error('RapidAPI error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch server status',
          status: response.status 
        }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched server status');

    // Transform to simplified format
    const simplifiedData = {
      online: data.online || false,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 0,
      },
      version: {
        name: data.version?.name_clean || data.version?.name || 'Unknown',
      },
      motd: {
        raw: data.motd?.clean?.[0] || data.motd?.raw?.[0] || 'Welcome to DarkAge SMP',
      },
      fetched_at: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify(simplifiedData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in server-status function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
