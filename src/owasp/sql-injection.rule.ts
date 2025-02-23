export function scanForSQLInjection(code: string): { line: number; message: string }[] {
    const vulnerabilities: { line: number; message: string }[] = [];
  
    const sqlInjectionPatterns = [
      /Statement\s+\w+\s*=\s*.*createStatement\s*\(\s*\)\s*;/i, 
      /\b(String\s+\w+\s*=\s*".*"\s*\+\s*\w+\s*\+.*;)/i,
      /executeQuery\s*\(\s*\w+\s*\)/i,
      /executeUpdate\s*\(\s*\w+\s*\)/i,
      /prepareStatement\s*\(\s*\w+\s*\)/i,
      /\b(SqlCommand|OleDbCommand|MySqlCommand)\s+\w+\s*=\s*new\s+\w+\s*\(\s*".*"\s*\+\s*\w+\s*\+.*\)/i,
      /\bExecuteReader\s*\(\s*\)/i,
      /\bExecuteNonQuery\s*\(\s*\)/i,
      /\b(query|execute)\s*\(\s*["'`].*\+\s*\w+\s*\+.*["'`]\s*\)/i,
      /\b(db\.query|db\.execute)\s*\(\s*["'`].*\+\s*\w+\s*\+.*["'`]\s*\)/i
    ];
  
    const lines = code.split("\n");
  
    lines.forEach((line, index) => {
      sqlInjectionPatterns.forEach((pattern) => {
        if (pattern.test(line)) {
          vulnerabilities.push({
            line: index,
            message: `⚠️ Potential SQL Injection detected: ${line.trim()}`
          });
        }
      });
    });
  
    return vulnerabilities;
  }