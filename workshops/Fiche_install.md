# Guide : Installation des simulations sur Raspberry

## 1. Créer un environnement virtuel (venv)
```bash
cd ~
sudo apt update && apt-get upgrade
sudo apt install git fonts-noto-color-emoji
sudo apt install --no-install-recommends xserver-xorg xorg xinit openbox unclutter lightdm
sudo apt install --no-install-recommends chromium-browser
```
## 2. Configurer lightdm 
Remplacer <USERNAME> par votre nom d'utilisateur, e.g. pi
```bash
sudo mv /etc/lightdm/lightdm.conf /etc/lightdm/lightdm.conf.backup
su
cat > /etc/lightdm/lightdm.conf << EOF
[Seat:*]
autologin-user=<USERNAME>
user-session=openbox
EOF
exit
```

## 3. Configurer l'autostart openbox
Remplacer <USERNAME> par votre nom d'utilisateur, e.g. pi
```bash
su
cat > /home/<USERNAME>/.config/openbox/autostart << EOF
#!/bin/bash

xset s off
xset s noblank
xset -dpms

unclutter -idle 0.1 -grab -root &

while :
 do
  xrandr --auto
  chromium \
    --no-first-run \
    --start-maximized \
    --disable \
    --disable-translate \
    --disable-infobars \
    --disable-suggestions-service \
    --disable-save-password-bubble \
    --disable-session-crashed-bubble \
    --incognito \
    --kiosk "http://127.0.0.1:5000"
  sleep 5
 done &
EOF
```

## 3. Configurer l'app en service
Remplacer <USERNAME> par votre nom d'utilisateur, e.g. pi
```bash
su
cat > /etc/systemd/system/modul-air.service << EOF
[Unit]
Description=Modul-Air Flask App
After=network.target

[Service]
User=<USERNAME>
WorkingDirectory=/home/thierry/modul-air
Environment="PATH=/home/thierry/modul-air/venv/bin"
ExecStart=/home/thierry/modul-air/venv/bin/python app.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF
exit
sudo systemctl start modul-air
sudo systemctl enable modul-air
```