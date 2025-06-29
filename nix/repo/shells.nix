{
  inputs,
  cell,
}: let
  inherit (inputs.std) lib std;
  inherit (inputs) nixpkgs;
in
  builtins.mapAttrs (_: lib.dev.mkShell) {
    # Tool Homepage: https://numtide.github.io/devshell/
    default = {
      name = "Organizations web dev shell";

      imports = [std.devshellProfiles.default];

      nixago = [
        cell.configs.treefmt
        cell.configs.conform
        cell.configs.lefthook
        cell.configs.just
      ];

      commands = [
        {
          package =
            inputs.bun2nix.packages.default;
        }
        {package = nixpkgs.bun;}
      ];
    };
  }
