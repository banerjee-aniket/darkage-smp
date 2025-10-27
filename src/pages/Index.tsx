import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ServerStatus from '@/components/ServerStatus';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="/darkage_logo.png" 
              alt="DarkAge SMP Logo" 
              className="h-16 w-16 object-contain"
            />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                DarkAge SMP
              </h1>
              <p className="text-muted-foreground">Official Server Page</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero CTAs */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Join the Adventure
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary hover:scale-105 transition-all w-full sm:w-auto"
            >
              <a
                href="https://discord.gg/q4pYvFxh3y"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90 shadow-glow-secondary hover:shadow-glow-secondary hover:scale-105 transition-all w-full sm:w-auto"
            >
              <a
                href="https://darkagesmp.tebex.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Shop <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:bg-accent/10 hover:text-accent hover:border-accent hover:scale-105 transition-all w-full sm:w-auto"
            >
              <a
                href="https://freemcserver.net/server/1795866"
                target="_blank"
                rel="noopener noreferrer"
              >
                Renew / Manage Server <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Server Status */}
        <section className="max-w-2xl mx-auto">
          <ServerStatus />
        </section>

        {/* Support Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Support DarkAge SMP
            </h2>
            <p className="text-muted-foreground mb-6">
              Donations help keep the server upgraded and online. Every contribution makes a difference!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 shadow-glow-secondary hover:scale-105 transition-all"
            >
              <a
                href="https://buymeacoffee.com/donatefordarkage"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate Now <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Card>
        </section>

        {/* Shop Embed */}
        <section className="max-w-6xl mx-auto">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Server Shop
            </h2>
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe
                src="https://darkagesmp.tebex.io/"
                className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-border"
                title="DarkAge SMP Shop"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                If the shop doesn't load above, open it directly:
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-secondary hover:bg-secondary/90"
              >
                <a
                  href="https://darkagesmp.tebex.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Shop <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              © 2025 DarkAge SMP | Managed by Lieutenant
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/q4pYvFxh3y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Discord
              </a>
              <a
                href="https://darkagesmp.tebex.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Shop
              </a>
              <a
                href="https://buymeacoffee.com/donatefordarkage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Donate
              </a>
              <a
                href="https://freemcserver.net/server/1795866"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Public Page
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
