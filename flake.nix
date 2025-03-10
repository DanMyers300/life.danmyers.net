{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShell.${system} = pkgs.mkShell {
      name = "wasm-game-of-life";
      buildInputs = with pkgs; [
        rustc
        cargo
        cargo-generate
        nodejs_23
        wasm-pack
      ];
    };
  };
}
