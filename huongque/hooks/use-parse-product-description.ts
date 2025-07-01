import { useMemo } from 'react';

interface ParsedProductContent {
  mainContent: string;
  certificates: string;
  hasCertificates: boolean;
}

export function useParseProductDescription(description: string): ParsedProductContent {
  return useMemo(() => {
    if (!description) {
      return {
        mainContent: '',
        certificates: '',
        hasCertificates: false
      };
    }

    // Look for the certificates section
    const certificateHeaderPattern = /<h4[^>]*>.*?Chứng nhận, xác nhận của cơ sở.*?<\/h4>/i;
    const certificateMatch = description.match(certificateHeaderPattern);
    
    if (!certificateMatch) {
      return {
        mainContent: description,
        certificates: '',
        hasCertificates: false
      };
    }

    // Find the index where certificates section starts
    const certificateStartIndex = certificateMatch.index || 0;
    
    // Split content
    const mainContent = description.substring(0, certificateStartIndex).trim();
    const certificates = description.substring(certificateStartIndex).trim();

    return {
      mainContent,
      certificates,
      hasCertificates: certificates.length > 0
    };
  }, [description]);
}
