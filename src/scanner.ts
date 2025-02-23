export function scanCode(code: string): string[] {
    const vulnerabilities: string[] = [];
  
    // Check for hardcoded credentials (Basic Example)
    const insecurePatterns = [
      /password\s*=\s*["'][^"']+["']/i,
      /apiKey\s*=\s*["'][^"']+["']/i,
      /secret\s*=\s*["'][^"']+["']/i
    ];
  
    insecurePatterns.forEach((pattern) => {
      if (pattern.test(code)) {
        vulnerabilities.push(`Potential hardcoded secret detected: ${pattern}`);
      }
    });
  
    return vulnerabilities;
  }