import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Megaphone } from "lucide-react";

export default function NoticeBoard() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/notice.md")
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load notices:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Card className="w-full bg-card/50 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Megaphone className="h-6 w-6 text-primary" />
          Notice Board
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border border-primary/10 p-4">
          {loading ? (
            <p className="text-muted-foreground">Loading notices...</p>
          ) : (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-primary mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
                  ),
                  hr: () => <hr className="border-primary/20 my-6" />,
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  em: ({ children }) => (
                    <em className="text-sm text-muted-foreground/80">{children}</em>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
