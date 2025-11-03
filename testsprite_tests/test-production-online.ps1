# Test Production URL - Portfolio Application
# Step 1: Test Production URL Accessibility and Basic Checks

Write-Host "🌐 Testing Production URL: https://hadibic.netlify.app/" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: URL Accessibility
Write-Host "1. Testing URL Accessibility..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://hadibic.netlify.app/" -Method Head -UseBasicParsing -TimeoutSec 10
    Write-Host "   ✅ URL is accessible!" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Content Type: $($response.Headers.'Content-Type')" -ForegroundColor Green
} catch {
    Write-Host "   ❌ URL not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Security Headers Check
Write-Host "2. Checking Security Headers..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://hadibic.netlify.app/" -Method Head -UseBasicParsing
    $headers = $response.Headers
    
    $securityHeaders = @{
        "X-Frame-Options" = $headers.'X-Frame-Options'
        "X-XSS-Protection" = $headers.'X-XSS-Protection'
        "X-Content-Type-Options" = $headers.'X-Content-Type-Options'
        "Strict-Transport-Security" = $headers.'Strict-Transport-Security'
    }
    
    $foundHeaders = 0
    foreach ($header in $securityHeaders.Keys) {
        if ($securityHeaders[$header]) {
            Write-Host "   ✅ $header : Present" -ForegroundColor Green
            $foundHeaders++
        } else {
            Write-Host "   ⚠️  $header : Missing" -ForegroundColor Yellow
        }
    }
    
    Write-Host "   Found $foundHeaders/4 security headers" -ForegroundColor Cyan
} catch {
    Write-Host "   ⚠️  Could not check headers" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Project Detail Page
Write-Host "3. Testing Project Detail Page..." -ForegroundColor Yellow
try {
    $projectUrl = "https://hadibic.netlify.app/project/11d46166-871a-4f8f-919a-80030991b5bf"
    $response = Invoke-WebRequest -Uri $projectUrl -Method Head -UseBasicParsing -TimeoutSec 10
    Write-Host "   ✅ Project page is accessible!" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Project page check failed" -ForegroundColor Yellow
    Write-Host "   URL: $projectUrl" -ForegroundColor Gray
}

Write-Host ""

# Test 4: Response Time
Write-Host "4. Checking Response Time..." -ForegroundColor Yellow
try {
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $response = Invoke-WebRequest -Uri "https://hadibic.netlify.app/" -UseBasicParsing -TimeoutSec 10
    $stopwatch.Stop()
    $responseTime = $stopwatch.ElapsedMilliseconds
    
    if ($responseTime -lt 2000) {
        Write-Host "   ✅ Fast response: ${responseTime}ms" -ForegroundColor Green
    } elseif ($responseTime -lt 3000) {
        Write-Host "   ⚠️  Moderate response: ${responseTime}ms" -ForegroundColor Yellow
    } else {
        Write-Host "   ❌ Slow response: ${responseTime}ms" -ForegroundColor Red
    }
} catch {
    Write-Host "   ⚠️  Could not measure response time" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# Summary
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   Production URL: https://hadibic.netlify.app/" -ForegroundColor White
Write-Host "   Project URL: https://hadibic.netlify.app/project/11d46166-871a-4f8f-919a-80030991b5bf" -ForegroundColor White
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open URL in browser for manual testing" -ForegroundColor White
Write-Host "   2. Run Lighthouse audit (F12 → Lighthouse tab)" -ForegroundColor White
Write-Host "   3. Test all pages manually" -ForegroundColor White
Write-Host "   4. Use checklist: testsprite_tests/MANUAL_TEST_CHECKLIST.md" -ForegroundColor White
Write-Host ""
Write-Host "Online Testing Tools:" -ForegroundColor Cyan
$pageSpeedUrl = "https://pagespeed.web.dev/analysis?url=https://hadibic.netlify.app"
$securityUrl = "https://securityheaders.com/?q=https://hadibic.netlify.app"
Write-Host "   PageSpeed: $pageSpeedUrl" -ForegroundColor White
Write-Host "   Security: $securityUrl" -ForegroundColor White
Write-Host ""

