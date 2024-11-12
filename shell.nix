{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-24.05.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.rustup
    pkgs.protobuf
    pkgs.nodejs
    pkgs.yarn
    pkgs.protoc-gen-grpc-web
  ];
}

