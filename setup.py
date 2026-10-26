import os
import sys
import subprocess

def run_command(command):
    """Run a command and print output"""
    print(f"\n{'='*60}")
    print(f"Running: {command}")
    print('='*60)
    result = subprocess.run(command, shell=True)
    return result.returncode

def main():
    print("""
    ╔════════════════════════════════════════════════════════╗
    ║     Wedding Calls - Setup Script                       ║
    ║     Wedding Photography & Event Management Website     ║
    ╚════════════════════════════════════════════════════════╝
    """)
    
    # Install requirements
    if run_command("pip install -r requirements.txt") != 0:
        print("❌ Failed to install requirements")
        return
    
    print("✅ Requirements installed successfully")
    
    # Run migrations
    if run_command("python manage.py migrate") != 0:
        print("❌ Failed to run migrations")
        return
    
    print("✅ Database migrations completed")
    
    # Populate data
    if run_command("python manage.py populate_data") != 0:
        print("❌ Failed to populate data")
        return
    
    print("✅ Sample data populated")
    
    print("""
    ╔════════════════════════════════════════════════════════╗
    ║     Setup Complete!                                     ║
    ╚════════════════════════════════════════════════════════╝
    
    Next steps:
    1. Create a superuser account:
       python manage.py createsuperuser
    
    2. Start the development server:
       python manage.py runserver
    
    3. Open your browser:
       Website: http://localhost:8000
       Admin:   http://localhost:8000/admin
    
    Enjoy building with Wedding Calls! 💒❤️
    """)

if __name__ == "__main__":
    main()
