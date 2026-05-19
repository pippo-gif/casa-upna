@echo off
:: CasaUPNA · Runner script per Windows Task Scheduler
SET SCRIPT_DIR=%~dp0
SET SCRIPT=%SCRIPT_DIR%updater.py
SET LOGFILE=%SCRIPT_DIR%updater.log

echo [%DATE% %TIME%] Avvio CasaUPNA updater... >> "%LOGFILE%"

:: 1. Prova percorso Python 3.11 installato da winget
SET PY311=%LOCALAPPDATA%\Programs\Python\Python311\python.exe
IF EXIST "%PY311%" (
    "%PY311%" "%SCRIPT%" >> "%LOGFILE%" 2>&1
    GOTO END
)

:: 2. Prova Python 3.12
SET PY312=%LOCALAPPDATA%\Programs\Python\Python312\python.exe
IF EXIST "%PY312%" (
    "%PY312%" "%SCRIPT%" >> "%LOGFILE%" 2>&1
    GOTO END
)

:: 3. Prova Python 3.10
SET PY310=%LOCALAPPDATA%\Programs\Python\Python310\python.exe
IF EXIST "%PY310%" (
    "%PY310%" "%SCRIPT%" >> "%LOGFILE%" 2>&1
    GOTO END
)

:: 4. Fallback generico
WHERE python >nul 2>&1
IF %ERRORLEVEL% == 0 ( python "%SCRIPT%" >> "%LOGFILE%" 2>&1 & GOTO END )
WHERE python3 >nul 2>&1
IF %ERRORLEVEL% == 0 ( python3 "%SCRIPT%" >> "%LOGFILE%" 2>&1 & GOTO END )
WHERE py >nul 2>&1
IF %ERRORLEVEL% == 0 ( py "%SCRIPT%" >> "%LOGFILE%" 2>&1 & GOTO END )

echo [ERRORE] Python non trovato. Installa Python da https://python.org >> "%LOGFILE%"

:END
echo [%DATE% %TIME%] Updater terminato. >> "%LOGFILE%"
