FROM nixos/nix

ENV PROJECT_PATH=/lorawan-device-profiles
WORKDIR $PROJECT_PATH

ENTRYPOINT ["nix-shell"]

