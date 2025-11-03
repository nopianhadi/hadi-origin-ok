# 🧪 Run All Tests Script - Portfolio Application
# PowerShell script untuk menjalankan semua tests

Write-Host "🚀 Starting All Tests for Portfolio Application" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Backend Tests
Write-Host "📊 Running Backend Tests (Supabase Integration)..." -ForegroundColor Yellow
Write-Host ""
node tests/run-backend-test.mjs
$backendResult = $LASTEXITCODE

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# 2. Check Production URL
Write-Host "🌐 Testing Production URL Accessibility..." -ForegroundColor Yellow
Write-Host ""
try {
    $response = Invoke-WebRequest -Uri "https://hadibic.netlify.app/" -Method Head -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ Production URL is accessible!" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   URL: https://hadibic.netlify.app/" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not verify production URL" -ForegroundColor Yellow
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# 3. Summary
Write-Host "📋 Test Summary" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host ""

if ($backendResult -eq 0) {
    Write-Host "✅ Backend Tests: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Backend Tests: FAILED" -ForegroundColor Red
}

Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Review test results above" -ForegroundColor White
Write-Host "   2. Test production URL: https://hadibic.netlify.app/" -ForegroundColor White
Write-Host "   3. Run Lighthouse audit in browser" -ForegroundColor White
Write-Host "   4. Use manual test checklist: testsprite_tests/MANUAL_TEST_CHECKLIST.md" -ForegroundColor White
Write-Host ""

Write-Host "Testing Complete!" -ForegroundColor Green

