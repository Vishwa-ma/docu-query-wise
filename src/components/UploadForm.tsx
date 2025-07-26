import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link, FileText } from 'lucide-react';

interface UploadFormProps {
  onDocumentSubmit: (documentUrl: string) => void;
  isLoading: boolean;
}

export const UploadForm = ({ onDocumentSubmit, isLoading }: UploadFormProps) => {
  const [documentUrl, setDocumentUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentUrl.trim()) {
      onDocumentSubmit(documentUrl.trim());
    }
  };

  return (
    <Card className="w-full shadow-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Document Upload</CardTitle>
            <CardDescription>
              Provide a document URL for analysis (PDF, DOCX, or email)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document-url" className="text-sm font-medium">
              Document URL
            </Label>
            <div className="relative">
              <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="document-url"
                type="url"
                placeholder="https://example.com/policy.pdf"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!documentUrl.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Load Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};