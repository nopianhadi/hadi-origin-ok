# Comprehensive Page Testing - Portfolio Application
$baseUrl = "https://hadibic.netlify.app"
$pages = @(
    @{Name="Home"; Path="/"},
    @{Name="About"; Path="/about"},
    @{Name="Contact"; Path="/contact"},
    @{Name="Blog"; Path="/blog"},
    @{Name="Project Detail"; Path="/project/11d46166-871a-4f8f-919a-80030991b5bf"},
    @{Name="Admin"; Path="/admin"}
)

Write-Host "Comprehensive Page Testing" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host ""

$results = @()
$successCount = 0
$failCount = 0

foreach ($page in $pages) {
    $url = "$baseUrl$($page.Path)"
    Write-Host "Testing: $($page.Name)..." -ForegroundColor Yellow
    Write-Host "  URL: $url" -ForegroundColor Gray
    
    try {
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
        $stopwatch.Stop()
        $responseTime = $stopwatch.ElapsedMilliseconds
        
        $successCount++
        Write-Host "  PASS - Status: $($response.StatusCode) | Time: ${responseTime}ms" -ForegroundColor Green
        
        $results += [PSCustomObject]@{
            Page = $page.Name
            Status = $response.StatusCode
            ResponseTime = $responseTime
            Result = "PASS"
        }
    }
    catch {
        $failCount++
        $statusCode = $_.Exception.Response.StatusCode.value__
        
        if ($statusCode -eq 401 -or $statusCode -eq 403) {
            Write-Host "  INFO - Protected/Redirected (Status: $statusCode)" -ForegroundColor Yellow
            $results += [PSCustomObject]@{
                Page = $page.Name
                Status = "Protected"
                ResponseTime = 0
                Result = "INFO"
            }
        }
        elseif ($statusCode -eq 404) {
            Write-Host "  FAIL - Not Found (404)" -ForegroundColor Red
            $results += [PSCustomObject]@{
                Page = $page.Name
                Status = "404"
                ResponseTime = 0
                Result = "FAIL"
            }
        }
        else {
            Write-Host "  FAIL - Error: $($_.Exception.Message)" -ForegroundColor Red
            $results += [PSCustomObject]@{
                Page = $page.Name
                Status = "ERROR"
                ResponseTime = 0
                Result = "FAIL"
            }
        }
    }
    Write-Host ""
}

Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "Total Pages: $($pages.Count)" -ForegroundColor White
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor $(if($failCount -gt 0){"Red"}else{"Green"})
Write-Host ""
Write-Host "Detailed Results:" -ForegroundColor Cyan
foreach ($result in $results) {
    $color = if($result.Result -eq "PASS"){"Green"}elseif($result.Result -eq "INFO"){"Yellow"}else{"Red"}
    Write-Host "  $($result.Page): $($result.Result) - $($result.Status)" -ForegroundColor $color
    if ($result.ResponseTime -gt 0) {
        Write-Host "    Response Time: $($result.ResponseTime)ms" -ForegroundColor Gray
    }
}
Write-Host ""

