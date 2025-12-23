#!/usr/bin/env python3
"""
Script to add sidebar navigation to pasien pages
"""

import os
import re

# Define the sidebar HTML template
SIDEBAR_HTML = '''  <!-- Sidebar -->
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
        <a href="dashboard.html" class="menu-link{DASHBOARD_ACTIVE}">
          <i>🏠</i>
          <span>Beranda</span>
        </a>
      </div>

      <!-- Jadwal Dokter -->
      <div class="menu-item">
        <a href="jadwal-dokter.html" class="menu-link{JADWAL_ACTIVE}">
          <i>📅</i>
          <span>Jadwal Dokter</span>
        </a>
      </div>

      <!-- Daftar Antrean -->
      <div class="menu-item">
        <a href="antrean.html" class="menu-link{ANTREAN_ACTIVE}">
          <i>🎫</i>
          <span>Daftar Antrean</span>
        </a>
      </div>

      <!-- Status Antrean -->
      <div class="menu-item">
        <a href="status-antrean.html" class="menu-link{STATUS_ACTIVE}">
          <i>📋</i>
          <span>Status Antrean</span>
        </a>
      </div>

      <!-- Permohonan Surat -->
      <div class="menu-item">
        <a href="permohonan-surat.html" class="menu-link{PERMOHONAN_ACTIVE}">
          <i>📄</i>
          <span>Permohonan Surat</span>
        </a>
      </div>

      <!-- Riwayat Surat -->
      <div class="menu-item">
        <a href="riwayat-surat.html" class="menu-link{RIWAYAT_ACTIVE}">
          <i>📜</i>
          <span>Riwayat Surat</span>
        </a>
      </div>

      <!-- Profil -->
      <div class="menu-item">
        <a href="profil.html" class="menu-link{PROFIL_ACTIVE}">
          <i>👤</i>
          <span>Profil</span>
        </a>
      </div>

      <!-- Chatbot -->
      <div class="menu-item">
        <a href="chatbot.html" class="menu-link{CHATBOT_ACTIVE}">
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
  <div class="main-content">'''

# Sidebar CSS to be added
SIDEBAR_CSS = '''    body {
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

'''

# File configurations: (filename, active_menu_key, page_title)
FILES = [
    ('antrean.html', 'ANTREAN', 'Daftar Antrean'),
    ('status-antrean.html', 'STATUS', 'Status Antrean'),
    ('jadwal-dokter.html', 'JADWAL', 'Jadwal Dokter'),
    ('permohonan-surat.html', 'PERMOHONAN', 'Permohonan Surat'),
    ('riwayat-surat.html', 'RIWAYAT', 'Riwayat Surat'),
    ('profil.html', 'PROFIL', 'Profil'),
    ('chatbot.html', 'CHATBOT', 'Chatbot'),
]

def add_sidebar_to_file(filename, active_key, page_title):
    """Add sidebar to a single file"""
    filepath = os.path.join(r'c:\Users\erade\Downloads\shcs-ppl\pasien', filename)
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create sidebar HTML with active menu item
    sidebar_html = SIDEBAR_HTML
    for key in ['DASHBOARD', 'JADWAL', 'ANTREAN', 'STATUS', 'PERMOHONAN', 'RIWAYAT', 'PROFIL', 'CHATBOT']:
        sidebar_html = sidebar_html.replace(f'{{{key}_ACTIVE}}', ' active' if key == active_key else '')
    
    # 1. Add sidebar CSS to styles
    # Find the first <style> tag and add our CSS right after it
    style_pattern = r'(<style[^>]*>)'
    if re.search(style_pattern, content):
        content = re.sub(style_pattern, r'\1\n' + SIDEBAR_CSS, content, count=1)
    
    # 2. Replace the header structure
    # Find and replace the logo/nav section in header
    header_pattern = r'(<body>\s*<header>\s*<div class="header-container">.*?)(</div>\s*</div>\s*</header>)'
    
    if re.search(header_pattern, content, re.DOTALL):
        # Replace with sidebar + main-content wrapper
        replacement = sidebar_html + f'''
  <header>
    <div class="header-container">
      <div class="logo" style="flex-direction: column; align-items: flex-start; gap: 0.25rem;">
        <h2 style="margin: 0; font-size: 1.5rem; color: #2c3e50;">{page_title}</h2>
        <p style="font-size: 0.85rem; margin: 0; color: #7f8c8d;">Portal Pasien SmartHealth</p>
      </div>

      <nav style="flex: 1; margin-left: 2rem;">
      </nav>
      '''
        
        # Find the header-right div opening
        header_right_pattern = r'<div class="header-right">'
        header_right_pos = content.find('<div class="header-right">')
        
        if header_right_pos != -1:
            # Find the end of header
            header_end_pattern = r'</div>\s*</div>\s*</header>'
            header_end_match = re.search(header_end_pattern, content[header_right_pos:])
            
            if header_end_match:
                # Extract the header-right content
                header_right_end = header_right_pos + header_end_match.end()
                header_right_content = content[header_right_pos:header_right_end - len('</div>\n  </div>\n  </header>')]
                
                # Find where body tag starts
                body_start = content.find('<body>')
                if body_start != -1:
                    # Find where header ends
                    next_main = content.find('<main', header_right_end)
                    
                    if next_main != -1:
                        # Build new content
                        new_content = content[:body_start + 6] + '\n' + replacement + header_right_content + '\n    </div>\n  </header>\n\n' + content[header_right_end:]
                        
                        # 3. Close main-content div before footer
                        footer_pattern = r'(\s*<footer>)'
                        new_content = re.sub(footer_pattern, r'  </div>\n\n\1', new_content, count=1)
                        
                        # Write back
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        
                        print(f'✓ Updated {filename}')
                        return True
    
    print(f'✗ Failed to update {filename} - pattern not found')
    return False

def main():
    """Main function"""
    print('Adding sidebar to pasien pages...\n')
    
    success_count = 0
    for filename, active_key, page_title in FILES:
        if add_sidebar_to_file(filename, active_key, page_title):
            success_count += 1
    
    print(f'\n✓ Successfully updated {success_count}/{len(FILES)} files')
    print('✓ dashboard.html was already updated manually')

if __name__ == '__main__':
    main()
