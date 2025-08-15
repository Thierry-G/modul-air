# Activer le mode Kiosk de Modul'Air

## Installation des paquets
```bash
sudo apt update && apt-get upgrade
sudo apt install --no-install-recommends xserver-xorg xorg xinit openbox unclutter lightdm
sudo apt  install --no-install-recommends chromium-browser
```
## Configuration de lightdm
```bash
sudo mv /etc/lightdm/lightdm.conf /etc/lightdm/lightdm.conf.backup
sudo touch  /etc/lightdm/lightdm.conf
sudo cat > /etc/lightdm/lightdm.conf << EOF
[Seat:*]
autologin-user=kiosk
user-session=openbox
EOF
```

## Configuration openbox
```bash
sudo touch  /home/kiosk/.config/openbox/autostart
sudo cat > /etc/lightdm/lightdm.conf << EOF
[Seat:*]
autologin-user=#pihuser#
user-session=openbox
EOF
```

## Configuration raspi-config
1 System Options > Configure system settings

    S6 Auto Login    Enable auto login to desktop or to command line 

    Would you like to automatically log in to the console? : No

    Would you like to automatically log in to the desktop? : Yes

