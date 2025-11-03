# Comprehensive Page Testing - Portfolio Application
# Test all main pages on production

$baseUrl = "https://hadibic.netlify.app"
$pages = @(
    @{Name="Home"; Path="/"; Description="Homepage"},
    @{Name="About"; Path="/about"; Description="About page"},
    @{Name="Contact"; Path="/contact"; Description="Contact page"},
    @{Name="Blog"; Path="/blog"; Description="Blog listing"},
    @{Name="Project Detail"; Path="/project/11d46166-871a-4f8f-919a-80030991b5bf"; Description="Project detail page"},
    @{Name="Admin"; Path="/admin"; Description="Admin dashboard"}
)

Write-Host "🌐 Comprehensive Page Testing" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host ""

$results = @()
$totalPages = $pages.Count
$successCount = 0
$failCount = 0

foreach ($page in $pages) {
    $url = "$baseUrl$($page.Path)"
    Write-Host "Testing: $($page.Name) ($($page.Description))..." -ForegroundColor Yellow
    Write-Host "  URL: $url" -ForegroundColor Gray
    
    try {
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
        $stopwatch.Stop()
        $responseTime = $stopwatch.ElapsedMilliseconds
        
        $status = "PASS"
        $statusColor = "Green"
        $successCount++
        
        Write-Host "  ✅ Status: $($response.StatusCode) | Response Time: ${responseTime}ms" -ForegroundColor Green
        
        $results += [PSCustomObject]@{
            Page = $page.Name
            URL = $url
            Status = $response.StatusCode
            ResponseTime = $responseTime
            Result = "PASS"
        }
    }
    catch {
        $status = "FAIL"
        $statusColor = "Red"
        $failCount++
        
        $errorMsg = $_.Exception.Message
        if ($errorMsg -like "*404*") {
            Write-Host "  ❌ Status: 404 Not Found" -ForegroundColor Red
        }
        elseif ($errorMsg -like "*401*" -or $errorMsg -like "*403*") {
            Write-Host "  ⚠️  Status: $($_.Exception.Response.StatusCode.value__) (Protected/Redirected)" -ForegroundColor Yellow
            $results += [PSCustomObject]@{
                Page = $page.Name
                URL = $url
                Status = "Protected/Redirected"
                ResponseTime = 0
                Result = "INFO"
            }
        }
        else {
            Write-Host "  ❌ Error: $errorMsg" -ForegroundColor Red
            $results += [PSCustomObject]@{
                Page = $page.Name
                URL = $url
                Status = "ERROR"
                ResponseTime = 0
                Result = "FAIL"
            }
        }
    }
    
    Write-Host ""
}

Write-Host "=============================" -ForegroundColor Cyan
Write-Host "📊 Test Summary" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Total Pages Tested: $totalPages" -ForegroundColor White
Write-Host "✅ Success: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor $(if($failCount -gt 0){"Red"}else{"Green"})
Write-Host "⚠️  Protected/Info: $($totalPages - $successCount - $failCount)" -ForegroundColor Yellow
Write-Host ""

# Detailed Results
Write-Host "📋 Detailed Results:" -ForegroundColor Cyan
foreach ($result in $results) {
    $color = switch($result.Result) {
        "PASS" { "Green" }
        "FAIL" { "Red" }
        "INFO" { "Yellow" }
        default { "White" }
    }
    
    $statusIcon = switch($result.Result) {
        "PASS" { "✅" }
        "FAIL" { "❌" }
        "INFO" { "⚠️ " }
        default { "❓" }
    }
    
    Write-Host "$statusIcon $($result.Page): $($result.Status)" -ForegroundColor $color
    if ($result.ResponseTime -gt 0) {
        Write-Host "   Response Time: $($result.ResponseTime)ms" -ForegroundColor Gray
    }
    Write-Host "   URL: $($result.URL)" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "=============================" -ForegroundColor Cyan
Write-Host "✅ Page Testing Complete!" -ForegroundColor Green

