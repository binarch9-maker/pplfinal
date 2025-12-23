# PowerShell script to add sidebar to pasien pages

$sidebarCSS = @'
    body {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      margin: 0;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 260px;
      background: #e6e6d6;
      color: #2c3e50;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .sidebar-header {
      padding: 0.875rem;
      background: #e6e6d6;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      text-align: center;
    }

    .sidebar-menu {
      padding: 1rem 0;
    }

    .menu-item {
      margin: 0.25rem 0;
    }

    .menu-link {
      display: flex;
      align-items: center;
      padding: 0.75rem 0.875rem;
      color: #2c3e50;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
      user-select: none;
      font-size: 0.95rem;
    }

    .menu-link:hover {
      background: rgba(0,0,0,0.08);
      padding-left: 1rem;
    }

    .menu-link.active {
      background: #3498db;
      color: #fff;
      border-left: 4px solid #2980b9;
      padding-left: 0.625rem;
    }

    .menu-link i {
      margin-right: 0.625rem;
      font-size: 1rem;
      width: 18px;
      text-align: center;
      font-style: normal;
    }

    .main-content {
      margin-left: 260px;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #f5f7fa;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 999;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background: #fff;
    }

    main {
      padding: 2rem;
      flex: 1;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
      .sidebar.mobile-open {
        transform: translateX(0);
      }
      .main-content {
        margin-left: 0;
      }
    }

'@

function Get-SidebarHTML {
    param (
        [string]$ActivePage
    )
    
    $dashActive = if ($ActivePage -eq "dashboard") { " active" } else { "" }
    $jadwalActive = if ($ActivePage -eq "jadwal-dokter") { " active" } else { "" }
    $antreanActive = if ($ActivePage -eq "antrean") { " active" } else { "" }
    $statusActive = if ($ActivePage -eq "status-antrean") { " active" } else { "" }
    $permohonanActive = if ($ActivePage -eq "permohonan-surat") { " active" } else { "" }
    $riwayatActive = if ($ActivePage -eq "riwayat-surat") { " active" } else { "" }
    $profilActive = if ($ActivePage -eq "profil") { " active" } else { "" }
    $chatbotActive = if ($ActivePage -eq "chatbot") { " active" } else { "" }

    return @"
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center;">
        <img src="../img/Smarthealth-Logo.png" alt="Smart Health Logo" style="height: 50px;">
        <div>
          <h2 style="margin: 0; font-size: 1.1rem; color: #2c3e50;">SmartHealth</h2>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: #5f7a95;">Portal Pasien</p>
        </div>
      </div>
    </div>

    <div class="sidebar-menu">
      <!-- Beranda -->
      <div class="menu-item">
        <a href="dashboard.html" class="menu-link$dashActive">
          <i>🏠</i>
          <span>Beranda</span>
        </a>
      </div>

      <!-- Jadwal Dokter -->
      <div class="menu-item">
        <a href="jadwal-dokter.html" class="menu-link$jadwalActive">
          <i>📅</i>
          <span>Jadwal Dokter</span>
        </a>
      </div>

      <!-- Daftar Antrean -->
      <div class="menu-item">
        <a href="antrean.html" class="menu-link$antreanActive">
          <i>🎫</i>
          <span>Daftar Antrean</span>
        </a>
      </div>

      <!-- Status Antrean -->
      <div class="menu-item">
        <a href="status-antrean.html" class="menu-link$statusActive">
          <i>📋</i>
          <span>Status Antrean</span>
        </a>
      </div>

      <!-- Permohonan Surat -->
      <div class="menu-item">
        <a href="permohonan-surat.html" class="menu-link$permohonanActive">
          <i>📄</i>
          <span>Permohonan Surat</span>
        </a>
      </div>

      <!-- Riwayat Surat -->
      <div class="menu-item">
        <a href="riwayat-surat.html" class="menu-link$riwayatActive">
          <i>📜</i>
          <span>Riwayat Surat</span>
        </a>
      </div>

      <!-- Profil -->
      <div class="menu-item">
        <a href="profil.html" class="menu-link$profilActive">
          <i>👤</i>
          <span>Profil</span>
        </a>
      </div>

      <!-- Chatbot -->
      <div class="menu-item">
        <a href="chatbot.html" class="menu-link$chatbotActive">
          <i>💬</i>
          <span>Chatbot</span>
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 1rem 0;">

      <!-- Logout -->
      <div class="menu-item">
        <a href="../login-pasien.html" class="menu-link" style="color: #e74c3c;">
          <i>🚪</i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="main-content">
"@
}

# File configurations
$files = @(
    @{ File = "antrean.html"; Active = "antrean"; Title = "Daftar Antrean" },
    @{ File = "status-antrean.html"; Active = "status-antrean"; Title = "Status Antrean" },
    @{ File = "jadwal-dokter.html"; Active = "jadwal-dokter"; Title = "Jadwal Dokter" },
    @{ File = "permohonan-surat.html"; Active = "permohonan-surat"; Title = "Permohonan Surat" },
    @{ File = "riwayat-surat.html"; Active = "riwayat-surat"; Title = "Riwayat Surat" },
    @{ File = "profil.html"; Active = "profil"; Title = "Profil" },
    @{ File = "chatbot.html"; Active = "chatbot"; Title = "Chatbot" }
)

Write-Host "Adding sidebar to pasien pages..." -ForegroundColor Cyan

foreach ($fileInfo in $files) {
    $filePath = "c:\Users\erade\Downloads\shcs-ppl\pasien\$($fileInfo.File)"
    
    Write-Host "`nProcessing: $($fileInfo.File)" -ForegroundColor Yellow
    
    try {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # 1. Add sidebar CSS after first <style> tag
        if ($content -match '(<style[^>]*>)') {
            $content = $content -replace '(<style[^>]*>)', "`$1`n$sidebarCSS"
        }
        
        # 2. Add sidebar HTML and wrap content
        $sidebarHTML = Get-SidebarHTML -ActivePage $fileInfo.Active
        
        # Replace header structure - find the pattern and replace
        $pattern = '(?s)<body>\s*<header>\s*<div class="header-container">.*?<nav[^>]*>.*?</nav>'
        
        $newHeader = "<body>`n$sidebarHTML`n  <header>`n    <div class=`"header-container`">`n      <div class=`"logo`" style=`"flex-direction: column; align-items: flex-start; gap: 0.25rem;`">`n        <h2 style=`"margin: 0; font-size: 1.5rem; color: #2c3e50;`">$($fileInfo.Title)</h2>`n        <p style=`"font-size: 0.85rem; margin: 0; color: #7f8c8d;`">Portal Pasien SmartHealth</p>`n      </div>`n`n      <nav style=`"flex: 1; margin-left: 2rem;`">`n      </nav>"
        
        $content = $content -replace $pattern, $newHeader
        
        # 3. Close main-content div before footer
        $content = $content -replace '(\s*<footer>)', "  </div>`n`n`$1"
        
        # Save file
        Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
        
        Write-Host "  [OK] Successfully updated $($fileInfo.File)" -ForegroundColor Green
    }
    catch {
        Write-Host "  [ERROR] Error updating $($fileInfo.File): $_" -ForegroundColor Red
    }
}

Write-Host "`n[DONE] Sidebar addition complete!" -ForegroundColor Green
Write-Host "[INFO] dashboard.html was already updated manually" -ForegroundColor Green
