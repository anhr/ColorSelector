rem run as administrator


cd /D "G:\My documents\MyProjects\trunk\WebFeatures\WebFeatures\GoogleSite\ColorSelector"
set jsFolderDest=C:\inetpub\wwwroot\GoogleSite\ColorSelector\

xcopy index.htm %jsFolderDest%index.htm /Y

rem использовать G:\My documents\MyProjects\trunk\WebFeatures\WebFeatures\JS\deploy.bat для копирования ColorSelector.js
rem xcopy ColorSelector.js %jsFolderDest%ColorSelector.js /Y

pause

